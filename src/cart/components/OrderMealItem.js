import React from "react";
import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";

const OrderMealItem = props => {
    return (
        <li className="meal-item">
            <Card className="meal-item__content">
                <div className="meal-item__image">
                    <Avatar image={props.image} alt={props.name} />
                </div>
                <div className="meal-item__info">
                    <h2>{props.name}</h2>
                    <h3>
                        <Button type="primary" shape="circle">+</Button>
                        {props.amount}
                        <Button type="primary" shape="circle">-</Button>

                        {'כמות'}
                    </h3>
                    <h3>
                        {props.price} {'מחיר'}
                    </h3>
                    <h3>

                        {props.amount * props.price} {'מחיר סופי'}
                    </h3>
                </div>
            </Card>
        </li>
    );
};

export default OrderMealItem;