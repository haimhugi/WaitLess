import React from 'react';

import Card from '../../shared/components/UIElements/Card'
import OrderMealsList from '../components/OrderMealsList';

const ORDER_MEALS = [
    {
        id: 'uo1',
        image: 'https://images.unsplash.com/photo-1498602753442-dfa7a49fc9c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
        name: 'שקשוקה',
        price: 54,
        amount: 3
    },
    {
        id: 'uo2',
        image: 'https://cdn.pixabay.com/photo/2018/03/31/07/43/bread-3277473_960_720.jpg',
        name: 'טוסט',
        price: 24,
        amount: 1
    },
    {
        id: 'uo3',
        image: 'https://cdn.pixabay.com/photo/2015/05/31/13/59/salad-791891_960_720.jpg',
        name: 'סלט',
        price: 43,
        amount: 2
    },
    {
        id: 'uo4',
        image: 'https://cdn.pixabay.com/photo/2019/04/10/22/06/breakfast-4118417_960_720.jpg',
        name: 'ארוחת בוקר יחיד',
        price: 43,
        amount: 4
    },

]

const Cart = () => {

    return <Card> <OrderMealsList items={ORDER_MEALS} /> </Card>
}
export default Cart;