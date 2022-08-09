import React from 'react';

import { List } from 'antd';
import Card from '../../shared/components/UIElements/Card';


import './MyOrderItem.css'




let i = 0;
const MyOrderItem = props => {
    if (props.mealsNumber === 0) return ''
    return (
        <List.Item>
            <Card style={{ width: '100%', textAlign: 'right', fontSize: '100%' }}>
                <div>
                    <p>   {'בהזמנה יש'}  {props.mealsNumber === 1 ? '' : props.mealsNumber}  {props.mealsNumber === 1 ? 'פריט' : 'פריטים'} {props.mealsNumber === 1 ? 'אחד' : ''}  </p>
                    <p>{' שולם  '} {props.totalPayed} {'שח'} </p>
                    <p > {props.date} {'הוזמן בתאריך'}   </p>
                    <List >
                        {props.mealsList.map(meal => (
                            <p key={meal + ++i} dir='rtl'>{'המוצרים שהזמנת הם:'} {' ' + (meal)}</p>
                        ))}
                    </List>
                </div>
            </Card>
        </List.Item>
    );
};

export default MyOrderItem;

