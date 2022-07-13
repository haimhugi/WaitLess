import React from 'react';

import { Space, Table } from 'antd';
import 'antd/dist/antd.css';

import Card from '../../shared/components/UIElements/Card';
const deleteOrder = () => {
    console.log('deleted');
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
    },
    {
        title: 'מוצרים',
        dataIndex: 'meals',
        key: 'meals',
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
                <a onClick={deleteOrder}>Delete</a>
            </Space>
        ),
    },
];

const OrdersList = props => {
    if (props.items.length === 0) {
        return <div className="center">
            <Card>
                <h2>No orders found.</h2>
            </Card>
        </div>
    }
    return (
        <Table rowKey="orderNumber" columns={columns} dataSource={props.items} />
    );
};

export default OrdersList;