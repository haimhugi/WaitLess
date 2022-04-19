import React from 'react';
import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { List, Typography, Divider } from 'antd';

import Card from '../../shared/components/UIElements/Card';
import './MyOrderItem.css'


const MyOrderItem = props => {
    return (
        <List.Item>
            <Card className="cardi">
                <div className="meal-item__info">
                    <h2 > {props.mealsamount === 1 ? 'פריט' : 'פריטים'} {props.mealsamount} {'בהזמנה'} </h2>
                    <h2 >{' שולם  '} {props.totalprice} {'שח'} </h2>
                    <h2 > {props.date} {'הוזמן בתאריך'}   </h2>
                </div>
            </Card>
        </List.Item >
    );
};

export default MyOrderItem;

