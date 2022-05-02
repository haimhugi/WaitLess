import React, { useContext } from 'react';

import OrderContext from '../../store/orders-context';
import MyOrderItem from './MyOrderItem';
import Card from '../../shared/components/UIElements/Card';
import { List } from 'antd';


const MyOrdersList = props => {
    const ordersCtx = useContext(OrderContext);
    console.log('the ordersList is ' + JSON.stringify(ordersCtx.ordersList.current));

    if (ordersCtx.ordersList.length === 0) {
        return <div className="center">
            <Card>
                <h2>אין הזמנות קודמות</h2>
            </Card>
        </div>
    }
    return (
        <List
            size="large"
            bordered >

            {ordersCtx.ordersList.current.map(order => (
                <MyOrderItem
                    key={order.orderId}
                    id={order.orderId}
                    date={order.date}
                    totalPayed={order.totalPayed}
                    mealsAmount={order.mealsAmount}
                    mealsList={order.mealsList}
                />
            ))}
        </List>
    );
};

export default MyOrdersList;

