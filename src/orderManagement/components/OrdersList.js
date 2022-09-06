import React, { useState, useEffect } from "react";

import { DownOutlined } from "@ant-design/icons";
import { Space, Form, Table, Dropdown, Menu, Popconfirm } from "antd";
import "antd/dist/antd.min.css";

import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: "הסתיים",
      },
      {
        key: "2",
        label: "בהכנה",
      },
    ]}
  />
);

const OrdersList = (props) => {
  const [currentRows, setCurrentRows] = useState([]);

  const [form] = Form.useForm();

  const save = async (id, updateStatus) => {
    try {
      await sendRequest(
        `http://localhost:5001/api/orders/update-status/${id}`,
        "PATCH",
        JSON.stringify({
          status: updateStatus,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.setPageChange(true);
    } catch (errInfo) {
    }
  };

  const { error, sendRequest, clearError } = useHttpClient();

  const deleteOrder = async (id) => {
    try {
      await sendRequest(`http://localhost:5001/api/orders/${id}`, "DELETE");
    } catch (err) { }
    props.setPageChange(true);
  };

  const [mealsNameList, setMealsNameList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const convertMealsIdToName = (arrMealsId) => {
    setIsLoading(true);

    setMealsNameList([]);
    let counter = 0;

    arrMealsId.forEach(async (mealId) => {

      try {
        const response = await fetch(
          `http://localhost:5001/api/meals/${mealId.mealId}`
        );
        const responseData = await response.json();
        setMealsNameList((oldArray) => [
          ...oldArray,
          JSON.stringify(responseData.name),
        ]);
        counter++;
        if (arrMealsId.length === counter) {
          setIsLoading(false);
        }
      } catch (err) {
      }
    });
  };
  const [usersName, setUsersName] = useState("");

  const convertUserIdToName = async (creator) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/users/${creator}`
      );
      const responseData = await response.json();

      setUsersName(JSON.stringify(responseData.user.name));
    } catch (err) {
    }
  };
  useEffect(() => {
  }, [usersName]);

  const columns = [
    {
      title: "מספר הזמנה",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "מספר מוצרים בהזמנה",
      dataIndex: "mealsNumber",
      key: "mealsNumber",
    },
    {
      title: "מחיר כולל סופי",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "תאריך",
      dataIndex: "date",
      key: "date",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.date > b.date,
    },

    {
      title: "הזמנה משולחן",
      dataIndex: "onTable",
      key: "onTable",
    },
    {
      title: "סטטוס ההזמנה",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "פעולה",
      key: "action",

      render: (_, record) => (
        <Popconfirm
          title="?בטוח שברצונך רוצה למחוק את ההזמנה הזאת"
          onConfirm={() => {
            deleteOrder(record.id);
          }}
        >
          <Space size="middle">
            <label style={{ color: "red", cursor: 'pointer' }}>הסר</label>
          </Space>
        </Popconfirm>
      ),
    },
    {
      title: " סטטוס הזמנה",
      dataIndex: "operation",
      render: () => (
        <Space>
          <Dropdown overlay={menu}>
            <label>
              שינוי סטטוס הזמנה <DownOutlined />
            </label>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const mergedColumns = columns;

  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>לא נמצאו הזמנות</h2>
        </Card>
      </div>
    );
  }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <Form form={form} component={false}>
        <Table
          style={{ direction: "rtl" }}
          expandedRowKeys={currentRows}
          expandable={{
            expandedRowRender: (record) => (
              <React.Fragment>
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      margin: 0,
                    }}
                  >
                    יוצר ההזמנה: &nbsp;
                  </span>
                  <span style={{ fontWeight: "normal" }}>{usersName}</span>
                  <div>
                    <span
                      style={{
                        margin: 0,
                      }}
                    >
                      המנות שהוזמנו: &nbsp;
                    </span>
                    {isLoading && <LoadingSpinner />}
                    {!isLoading && <span style={{ fontWeight: "normal" }}>
                      {mealsNameList}
                    </span>}
                  </div>
                </div>
              </React.Fragment>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
            onExpand: (expanded, record) => {
              const keys = [];
              if (expanded) {
                keys.push(record.id);
              }
              setCurrentRows(keys);
              convertMealsIdToName(record.meals);
              convertUserIdToName(record.creator);
            },
          }}
          dataSource={props.items}
          bordered
          columns={mergedColumns}
          rowKey={(record) => record.id}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                if (
                  event.target.className === "ant-dropdown-menu-title-content"
                ) {
                  if (event.target.innerHTML === "הסתיים") {
                    save(record.id, "done");
                  }
                  if (event.target.innerHTML === "בהכנה") {
                    save(record.id, "in preparation");
                  }
                }
              },
            };
          }}
        />
      </Form>
    </React.Fragment>
  );
};

export default OrdersList;
