import React, { useState } from 'react';

import { DownOutlined } from '@ant-design/icons';
import { Space, Form, Table, Dropdown, Menu, Typography } from "antd";
import 'antd/dist/antd.css';


import Card from '../../shared/components/UIElements/Card';
import { useHttpClient } from '../../shared/hooks/http-hook'


const menu = (
    <Menu
        items={[
            {
                key: '1',
                label: 'הסתיים',
            },
            {
                key: '2',
                label: 'בהכנה',
            },
        ]}
    />
);


const OrdersList = props => {

    const [currentRows, setCurrentRows] = useState([]);


    const [form] = Form.useForm();
    // const [data, setData] = useState(props.items);



    const save = async (id, updateStatus) => {
        try {
            await sendRequest(
                `http://localhost:5001/api/orders/update-status/${id}`,
                'PATCH',
                JSON.stringify({
                    status: updateStatus
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            props.setPageChange(true);

        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };




    const { sendRequest } = useHttpClient();

    const deleteOrder = async id => {
        try {
            await sendRequest(
                `http://localhost:5001/api/orders/${id}`,
                'DELETE'
            );
        } catch (err) { }
        console.log('remove meal with the id: ' + id);
        props.setPageChange(true);
    }



    const [mealsNameList, setMealsNameList] = useState([]);

    const convertMealsIdToName = arrMealsId => {

        setMealsNameList([]);
        arrMealsId.forEach(async mealId => {
            try {
                const response = await fetch(`http://localhost:5001/api/meals/${mealId.mealId}`);
                const responseData = await response.json();
                setMealsNameList(oldArray => [...oldArray, JSON.stringify(responseData.name)]);
            } catch (err) {
                console.log(err);
            }
        });

    }


    const columns = [

        {
            title: 'מספר הזמנה',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
        },
        {
            title: 'מספר מוצרים בהזמנה',
            dataIndex: 'mealsNumber',
            key: 'mealsNumber',
        },
        {
            title: 'מחיר כולל סופי',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'תאריך',
            dataIndex: 'date',
            key: 'date',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.date > b.date,
        },

        {
            title: 'הזמנה משולחן',
            dataIndex: 'onTable',
            key: 'onTable',
        },
        {
            title: 'סטטוס ההזמנה',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'יוצר ההזמנה',
            dataIndex: 'creator',
            key: 'creator',
        },

        {
            title: 'Action',
            key: 'action',

            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => { deleteOrder(record.id) }}>Delete</a>
                </Space>
            ),
        },
        {
            title: "operation",
            dataIndex: "operation",
            render: () => (
                <Space>
                    <Dropdown overlay={menu}>
                        <a>
                            שינוי סטטוס הזמנה <DownOutlined />
                        </a>
                    </Dropdown>
                </Space>
            ),
        },
    ];

    const mergedColumns = columns;

    if (props.items.length === 0) {
        return <div className="center">
            <Card>
                <h2>לא נמצאו הזמנות</h2>
            </Card>
        </div>
    }
    return (

        //<Table rowKey="orderNumber" columns={columns} dataSource={props.items} />
        <Form form={form} component={false}>
            <Table expandedRowKeys={currentRows}
                //columns={columns}
                expandable={{
                    expandedRowRender: (record) => (
                        <p
                            style={{
                                margin: 0,
                            }}
                        >
                            {mealsNameList}
                        </p>
                    ),
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                    onExpand: (expanded, record) => {
                        const keys = [];
                        if (expanded) {
                            keys.push(record.id);
                        }
                        setCurrentRows(keys);
                        console.log('!!!!!!!!!!!!!!!!');
                        console.log(record);
                        convertMealsIdToName(record.meals)
                    }

                }}
                dataSource={props.items}
                scroll={{
                    x: 1500,
                    y: 300,
                }}
                bordered
                columns={mergedColumns}
                rowKey={record => record.id}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            if (event.target.className === 'ant-dropdown-menu-title-content') {
                                console.log(record.id);
                                console.log(event.target.innerHTML);
                                if (event.target.innerHTML === 'הסתיים') { save(record.id, 'done') }
                                if (event.target.innerHTML === 'בהכנה') { save(record.id, 'in preparation') }
                            }
                        },

                    };
                }}
            />
        </Form>
    );
};

export default OrdersList;