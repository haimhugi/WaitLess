import React, { useContext, useState, useEffect } from 'react';

import OrderContext from '../../store/orders-context';
import MyOrderItem from './MyOrderItem';
import { List } from 'antd';
import { useHttpClient } from '../../shared/hooks/http-hook';

import AuthContext from '../../store/auth-context';



const MyOrdersList = props => {
    console.log(props.loadedOrders);
    if (!props.loadedOrders) {
        return <div className="center">
            <h2>אין הזמנות קודמות</h2>
        </div>
    }
    return (
        <List
            size="large"
            bordered >

            {props.loadedOrders.map(order => (
                <MyOrderItem
                    key={order.orderNumber}
                    id={order.id}
                    date={order.date}
                    totalPayed={order.totalPrice}
                    mealsAmount={order.mealsAmount}
                    mealsList={order.meals}
                />
            ))}
        </List>
    );
};

export default MyOrdersList;

