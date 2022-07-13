import React, { useContext } from 'react';

import { Radio } from 'antd';
import 'antd/dist/antd.css';

import Card from '../../shared/components/UIElements/Card';
import OrdersList from '../components/OrdersList';
import StatusContext from '../../store/status-context';

const ORDERS = [
    {
        orderNumber: 'mo1',
        mealsNumber: '4',
        totalPrice: '108',
        date: '24.02.22 19:48',
        meals: ['2913912391239', '821381238', '81232193129'],
        onTable: '4',
        status: 'done',
        creator: 'user32323'
    },
    {
        orderNumber: 'mo2',
        mealsNumber: '4',
        totalPrice: '108',
        date: '24.02.22 19:48',
        meals: ['2913912391239', '821381238', '81232193129'],
        onTable: '4',
        status: 'done',
        creator: 'user32323'
    },
    {
        orderNumber: 'mo3',
        mealsNumber: '4',
        totalPrice: '108',
        date: '24.02.22 19:48',
        meals: ['2913912391239 ', '821381238 ', '81232193129 '],
        onTable: '4',
        status: 'done',
        creator: 'user32323'
    },
    {
        orderNumber: 'mo4',
        mealsNumber: '4',
        totalPrice: '108',
        date: '24.02.22 19:48',
        meals: ['2913912391239', '821381238', '81232193129'],
        onTable: '4',
        status: 'in preparation',
        creator: 'user32323'
    },
]



const OrderManagement = props => {
    const statusCtx = useContext(StatusContext);


    if (statusCtx.pickedOrderStatus !== 'all') {
        let filteredOrders = ORDERS.filter(order => { return order.status === statusCtx.pickedOrderStatus })
        return (
            <Card>
                <Radio.Group defaultValue="in preparation" buttonStyle="solid" onChange={(event) => { statusCtx.changeStatus(event.target.value) }}>
                    <Radio.Button value="done">הזמנות שהושלמו</Radio.Button>
                    <Radio.Button value="in preparation">הזמנות בהכנה</Radio.Button>
                    <Radio.Button value="all">הכל</Radio.Button>
                </Radio.Group>
                <OrdersList items={filteredOrders} />
            </Card>)
    }
    return (
        <Card>
            <Radio.Group defaultValue="in preparation" buttonStyle="solid" onChange={(event) => { statusCtx.changeStatus(event.target.value) }}>
                <Radio.Button value="done">הזמנות שהושלמו</Radio.Button>
                <Radio.Button value="in preparation">הזמנות בהכנה</Radio.Button>
                <Radio.Button value="all">הכל</Radio.Button>
            </Radio.Group>
            <OrdersList items={ORDERS} />
        </Card>)
};

export default OrderManagement;
