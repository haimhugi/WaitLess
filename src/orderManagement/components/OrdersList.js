import React, { useState, useEffect } from 'react';

import { Space, Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import 'antd/dist/antd.css';


import Card from '../../shared/components/UIElements/Card';
import { useHttpClient } from '../../shared/hooks/http-hook'



const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`
                        }
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};


const OrdersList = props => {

    const [currentRows, setCurrentRows] = useState([]);


    const [form] = Form.useForm();
    const [data, setData] = useState(props.items);
    const [editingKey, setEditingKey] = useState("");

    const isEditing = (record) => record.id === editingKey;

    const edit = (record) => {
        console.log("record");
        console.log(record);
        form.setFieldsValue({
            status: "",
            ...record
        });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.id);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }
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

    // const [mealsNameList, setMealsNameList] = useState([]);

    // useEffect(() => {

    //     const sendRequest1 = async () => {

    //         props.items.meals.forEach(async mealId => {
    //             try {
    //                 const response = await fetch(`http://localhost:5001/api/meals/${mealId}`);
    //                 const responseData = await response.json();
    //                 setMealsNameList(oldArray => [...oldArray, JSON.stringify(responseData.name)]);
    //                 //mealsNameList.push(JSON.stringify(responseData.name));
    //             } catch (err) {
    //                 console.log(err);
    //             }
    //         });
    //     };
    //     sendRequest1();
    // }, []);

    const [mealsNameList, setMealsNameList] = useState([]);

    const convertMealsIdToName = arrMealsId => {

        setMealsNameList([]);
        arrMealsId.forEach(async mealId => {
            try {
                const response = await fetch(`http://localhost:5001/api/meals/${mealId}`);
                const responseData = await response.json();
                setMealsNameList(oldArray => [...oldArray, JSON.stringify(responseData.name)]);
            } catch (err) {
                console.log(err);
            }
        });


        //     const sendRequest1 = async () => {

        //         props.items.meals.forEach(async mealId => {
        //             try {
        //                 const response = await fetch(`http://localhost:5001/api/meals/${mealId}`);
        //                 const responseData = await response.json();
        //                 setMealsNameList(oldArray => [...oldArray, JSON.stringify(responseData.name)]);
        //                 //mealsNameList.push(JSON.stringify(responseData.name));
        //             } catch (err) {
        //                 console.log(err);
        //             }
        //         });
        //     };
        //     sendRequest1();
        // }, []);
    }


    const columns = [

        {
            title: 'מספר הזמנה',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            editable: false,
        },
        {
            title: 'מספר מוצרים בהזמנה',
            dataIndex: 'mealsNumber',
            key: 'mealsNumber',
            editable: false,
        },
        {
            title: 'מחיר כולל סופי',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            editable: false,
        },
        {
            title: 'תאריך',
            dataIndex: 'date',
            key: 'date',
            editable: false,
        },

        {
            title: 'הזמנה משולחן',
            dataIndex: 'onTable',
            key: 'onTable',
            editable: false,
        },
        {
            title: 'סטטוס ההזמנה',
            dataIndex: 'status',
            key: 'status',
            editable: true,
        },
        {
            title: 'יוצר ההזמנה',
            dataIndex: 'creator',
            key: 'creator',
            editable: false,
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
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.id)}
                            style={{
                                marginRight: 8
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link
                        disabled={editingKey !== ""}
                        onClick={() => edit(record)}
                    >
                        Edit
                    </Typography.Link>
                );
            }
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === "age" ? "number" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record)
            })
        };
    });
    console.log("props.items.meals");
    console.log(props.items);
    props.items.meals = mealsNameList;
    console.log(props.items.meals);

    if (props.items.length === 0) {
        return <div className="center">
            <Card>
                <h2>No orders found.</h2>
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
                        convertMealsIdToName(record.meals)
                    }

                }}
                dataSource={props.items}
                scroll={{
                    x: 1500,
                    y: 300,
                }}
                components={{
                    body: {
                        cell: EditableCell
                    }
                }}
                bordered
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel
                }}
                rowKey={record => record.id}
            />
        </Form>
    );
};

export default OrdersList;