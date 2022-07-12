import React, { useContext } from 'react';

import OrderContext from '../../store/orders-context';
import MyOrderItem from './MyOrderItem';
import { List } from 'antd';


const MyOrdersList = props => {
    const ordersCtx = useContext(OrderContext);
    // console.log('the ordersList is ' + JSON.stringify(ordersCtx.ordersList.current));
    //console.log('the length of ordersList is ' + ordersCtx.ordersList.current.length);


    if (ordersCtx.ordersList.current.length === 1) {
        return <div className="center">
            <h2>אין הזמנות קודמות</h2>
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

