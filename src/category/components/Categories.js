import React from "react";
import { useContext, useState, useEffect } from "react";

import { List, Button, Tooltip, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import "./Categories.css";
import CategoryContext from "../../store/category-context";
import AddCategory from "./AddCategory";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Categories = (props) => {
  //load categories data
  const [pageChange, setPageChange] = useState(false);

  const [CATEGORIES, setCATEGORIES] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const sendRequest = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/meals/categories"
        );
        const responseData = await response.json();
        let arr = [];
        for (let prop in responseData.categories) {
          arr.push(responseData.categories[prop].name);
        }
        setCATEGORIES(arr);
      } catch (err) {
      }
      setIsLoading(false);
    };
    sendRequest();
    setPageChange(false);
  }, [pageChange]);

  const [addCategoryOn, setAddCategoryOn] = useState(false);

  const showAddCategoryOn = () => {
    setAddCategoryOn(true);
  };
  const hideAddCategoryOn = () => {
    setPageChange(true);
    setAddCategoryOn(false);
  };

  const categoryCtx = useContext(CategoryContext);

  const { error, sendRequest, clearError } = useHttpClient();

  const deleteCategoryReq = async (item) => {
    try {
      await sendRequest(
        `http://localhost:5001/api/meals/deleteCategory/${item}`,
        "DELETE"
      );
    } catch (err) { }
    setPageChange(true);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      <div className="cat-list">
        <List
          size="large"
          dataSource={CATEGORIES}
          renderItem={(item) => (
            <List.Item>
              {props.isAdmin && (
                item !== 'הכל' &&
                <Popconfirm
                  title="?בטוח שברצונך רוצה למחוק את הקטגוריה הזאת"
                  onConfirm={() => deleteCategoryReq(item)}
                  }
                >
                  <Tooltip className="deleteCategory">
                    <Button
                      className="delete-cat-btn"
                      danger
                      type="primary"
                      shape="circle"
                      icon={<DeleteOutlined />}
                    />
                  </Tooltip>
                </Popconfirm>

              )}
              {props.isAdmin && (
                item === 'הכל' && <Tooltip className="deleteCategory">
                  <Button
                    shape="circle"
                  />
                </Tooltip>
              )}

              <Button
                className="category"
                onClick={() => categoryCtx.changeCategory(item)}
              >
                {item}
              </Button>
            </List.Item>
          )}
        >
          {props.isAdmin && (
            <List.Item>
              <Button className="addCategory" onClick={showAddCategoryOn}>
                הוסף קטגוריה
              </Button>
            </List.Item>
          )}
        </List>
        {addCategoryOn && props.isAdmin && (
          <AddCategory onClose={hideAddCategoryOn} CATEGORIES={CATEGORIES} />
        )}
      </div>
    </React.Fragment>
  );
};

export default Categories;
