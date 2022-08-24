import React, { useContext, useState, useEffect } from 'react';

import Card from '../../shared/components/UIElements/Card';
import MyOrdersList from '../components/MyOrdersList';
import './MyOrders.css'
import { Divider } from 'antd';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';

import AuthContext from '../../store/auth-context';


/*
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
        date: '29.02.22',
        totalprice: 80,
        mealsamount: 3
        //mealslist : [all the meals in the order];
    },
    {
        id: 'mo3',
        date: '01.03.22',
        totalprice: 301,
        mealsamount: 10
        //mealslist : [all the meals in the order];
    },
    {
        id: 'mo4',
        date: '14.03.22',
        totalprice: 33,
        mealsamount: 1
        //mealslist : [all the meals in the order];
    },
]
*/

const MyOrders = () => {

    const { error, sendRequest, clearError } = useHttpClient();
    const [loadedOrders, setLoadedOrders] = useState('');
    const AuthCtx = useContext(AuthContext);

    useEffect(() => {

        const sendRequest = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/orders/user/${AuthCtx.userId}`);
                const responseData = await response.json();
                console.log(responseData);
                setLoadedOrders(responseData.orders);
            } catch (err) {
                console.log(err);
            }
        };
        sendRequest();
    }, []);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />

            <Card>
                <Divider className='divider' orientation='right'>ההזמנות שלי</Divider>
                <MyOrdersList loadedOrders={loadedOrders} />
            </Card>
        </React.Fragment>
    );

};

export default MyOrders;