import React from 'react';

import { List } from 'antd';
import Card from '../../shared/components/UIElements/Card';


import './MyOrderItem.css'





const MyOrderItem = props => {
    return (
        <List.Item>
            <Card style={{ width: '100%', textAlign: 'right', fontSize: '100%' }}>
                <div>
                    <p>   {'בהזמנה יש'}  {props.mealsamount === 1 ? '' : props.mealsamount}  {props.mealsamount === 1 ? 'פריט' : 'פריטים'} {props.mealsamount === 1 ? 'אחד' : ''}  </p>
                    <p>{' שולם  '} {props.totalprice} {'שח'} </p>
                    <p > {props.date} {'הוזמן בתאריך'}   </p>
                </div>
            </Card>
        </List.Item>
    );
};

export default MyOrderItem;

