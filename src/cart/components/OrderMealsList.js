import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import OrderMealItem from '../components/OrderMealItem'

const OrderMealsList = props => {

    if (props.items.length === 0) {
        return <div className="center">
            <Card>
                <h2>אין מוצרים בעגלה</h2>
            </Card>
        </div>
    }
    return (
        <ul className="meals-list">
            {props.items.map(order_meal => (
                <OrderMealItem
                    key={order_meal.id}
                    id={order_meal.id}
                    image={order_meal.image}
                    name={order_meal.name}
                    price={order_meal.price}
                    amount={order_meal.amount}
                />
            ))}
        </ul>
    );
};

export default OrderMealsList;