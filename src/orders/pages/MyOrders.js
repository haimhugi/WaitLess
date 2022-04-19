import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import MyOrdersList from '../components/MyOrdersList';
import { Divider } from 'antd';



const MY_ORDERS = [
    {
        id: 'mo1',
        date: '24.02.22 19:48',
        totalprice: 108,
        mealsamount: 4
        //mealslist : [all the meals in the order];
    },
    {
        id: 'mo2',
        date: '29.02.22 12:36',
        totalprice: 80,
        mealsamount: 3
        //mealslist : [all the meals in the order];
    },
    {
        id: 'mo3',
        date: '01.03.22 14:56',
        totalprice: 301,
        mealsamount: 10
        //mealslist : [all the meals in the order];
    },
    {
        id: 'mo4',
        date: '14.03.22 16:32',
        totalprice: 33,
        mealsamount: 1
        //mealslist : [all the meals in the order];
    },

]
const MyOrders = () => {

    return (

        <React.Fragment>
            <Divider orientation="right">ההזמנות שלי</Divider>
            <MyOrdersList items={MY_ORDERS} />
        </React.Fragment>);

};

export default MyOrders;