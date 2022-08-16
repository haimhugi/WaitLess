import React, { useState, useEffect } from 'react';

import { List } from 'antd';
import Card from '../../shared/components/UIElements/Card';
import ReviewModal from './ReviewModal';


import './MyOrderItem.css'




let i = 0;
const MyOrderItem = props => {
    const [mealNameClicked, setMealNameClicked] = useState('');

    const [reviewModal, setReviewModal] = useState(false);

    const reviewModalOn = async () => {
        setReviewModal(true);
    }

    const reviewModalOff = () => {
        setReviewModal(false);
    }

    const [mealsNameList, setMealsNameList] = useState([]);
    useEffect(() => {

        const sendRequest1 = async () => {

            props.mealsList.forEach(async mealId => {
                try {
                    const response = await fetch(`http://localhost:5001/api/meals/${mealId}`);
                    const responseData = await response.json();
                    setMealsNameList(oldArray => [...oldArray, JSON.stringify(responseData.name)]);
                    //mealsNameList.push(JSON.stringify(responseData.name));
                } catch (err) {
                    console.log(err);
                }
            });
        };
        sendRequest1();
    }, []);




    if (props.mealsNumber === 0) return ''
    return (
        <React.Fragment>
            {reviewModal && <ReviewModal mealName={mealNameClicked} onClose={reviewModalOff} />}
            <List>
                <List.Item>
                    <Card style={{ width: '100%', textAlign: 'right', fontSize: '100%' }}>
                        <div>
                            <p>   {'בהזמנה יש'}  {props.mealsNumber === 1 ? '' : props.mealsNumber}  {props.mealsNumber === 1 ? 'פריט' : 'פריטים'} {props.mealsNumber === 1 ? 'אחד' : ''}  </p>
                            <p>{' שולם  '} {props.totalPayed} {'שח'} </p>
                            <p > {props.date} {'הוזמן בתאריך'}   </p>
                            <p > {props.onTable} {'הוזמן בשולחן'}   </p>
                            <p > {props.status} {'סטטוס הזמנה'}   </p>
                            <List >
                                {mealsNameList.map(name => (
                                    <a onClick={() => { setMealNameClicked(name.replaceAll('"', '')); reviewModalOn() }} style={{ display: "inline" }} key={name + ++i} dir='rtl'>{(name) + ','}</a>
                                ))}
                                <p style={{ display: "inline" }} dir='rtl'>{' המוצרים שהזמנת הם: '}</p>
                                <p dir='rtl'>{'  לכתיבת ביקורת לחץ על שם המנה ⬆'}</p>
                            </List>
                        </div>
                    </Card>
                </List.Item>
            </List>
        </React.Fragment>
    );
};

export default MyOrderItem;

