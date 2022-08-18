import React, { useContext, useState, useEffect } from 'react';

import { Radio } from 'antd';
import 'antd/dist/antd.css';

import Card from '../../shared/components/UIElements/Card';
import OrdersList from '../components/OrdersList';
import StatusContext from '../../store/status-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';


// const ORDERS = [
//     {
//         orderNumber: 'mo1',
//         mealsNumber: '4',
//         totalPrice: '108',
//         date: '24.02.22 19:48',
//         meals: ['2913912391239', '821381238', '81232193129'],
//         onTable: '4',
//         status: 'done',
//         creator: 'user32323'
//     },
//     {
//         orderNumber: 'mo2',
//         mealsNumber: '4',
//         totalPrice: '108',
//         date: '24.02.22 19:48',
//         meals: ['2913912391239', '821381238', '81232193129'],
//         onTable: '4',
//         status: 'done',
//         creator: 'user32323'
//     },
//     {
//         orderNumber: 'mo3',
//         mealsNumber: '4',
//         totalPrice: '108',
//         date: '24.02.22 19:48',
//         meals: ['2913912391239 ', '821381238 ', '81232193129 '],
//         onTable: '4',
//         status: 'done',
//         creator: 'user32323'
//     },
//     {
//         orderNumber: 'mo4',
//         mealsNumber: '4',
//         totalPrice: '108',
//         date: '24.02.22 19:48',
//         meals: ['2913912391239', '821381238', '81232193129'],
//         onTable: '4',
//         status: 'in preparation',
//         creator: 'user32323'
//     },
// ]



const OrderManagement = props => {

    //load orders data
    const [pageChange, setPageChange] = useState(false);
    const [ORDERS, setOrders] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const sendRequest = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/orders');
                const responseData = await response.json();
                setOrders(responseData.orders);
            } catch (err) {
                console.log(err);
            }
            setIsLoading(false);
        };
        sendRequest();
        setPageChange(false);
    }, [pageChange]);


    const statusCtx = useContext(StatusContext);


    if (statusCtx.pickedOrderStatus !== 'all') {
        let filteredOrders = Object.values(ORDERS);
        let filteredOrders1 = filteredOrders.filter(order => { return order.status === statusCtx.pickedOrderStatus })
        return (
            <React.Fragment>
                {isLoading && (
                    <div className="center">
                        <LoadingSpinner />
                    </div>
                )}
                <Card>
                    <Radio.Group defaultValue="in preparation" buttonStyle="solid" onChange={(event) => { statusCtx.changeStatus(event.target.value) }}>
                        <Radio.Button value="done">הזמנות שהושלמו</Radio.Button>
                        <Radio.Button value="in preparation">הזמנות בהכנה</Radio.Button>
                        <Radio.Button value="all">הכל</Radio.Button>
                    </Radio.Group>
                    <OrdersList setPageChange={setPageChange} items={filteredOrders1} />
                </Card>
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            <Card>
                <Radio.Group defaultValue="in preparation" buttonStyle="solid" onChange={(event) => { statusCtx.changeStatus(event.target.value) }}>
                    <Radio.Button value="done">הזמנות שהושלמו</Radio.Button>
                    <Radio.Button value="in preparation">הזמנות בהכנה</Radio.Button>
                    <Radio.Button value="all">הכל</Radio.Button>
                </Radio.Group>
                <OrdersList setPageChange={setPageChange} items={ORDERS} />
            </Card>
        </React.Fragment>
    )
};

export default OrderManagement;
