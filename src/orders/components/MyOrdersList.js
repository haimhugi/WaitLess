import React from 'react';

import MyOrderItem from './MyOrderItem';
import Card from '../../shared/components/UIElements/Card';
import { List } from 'antd';


const MyOrdersList = props => {
    if (props.items.length === 0) {
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
            {props.items.map(order => (
                <MyOrderItem
                    key={order.id}
                    id={order.id}
                    date={order.date}
                    totalprice={order.totalprice}
                    mealsamount={order.mealsamount}
                //mealslist= order.mealslist
                />
            ))}
        </List>
    );
};

export default MyOrdersList;

