import React from 'react';

import MyOrderItem from './MyOrderItem';
import { List } from 'antd';




const MyOrdersList = props => {



    console.log(JSON.stringify(props.loadedOrders) + ' JSON.stringify(props.loadedOrders)');

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
                    key={order.id}
                    id={order.id}
                    date={order.date}
                    totalPayed={order.totalPrice}
                    mealsNumber={order.mealsNumber}
                    mealsList={order.meals}
                    status={order.status}
                    onTable={order.onTable}
                />
            ))}
        </List>
    );
};

export default MyOrdersList;

