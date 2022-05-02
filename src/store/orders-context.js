import { createContext } from 'react';

const OrderContext = createContext([{
    orderId: 'o1',
    date: '',
    totalPayed: 0,
    mealsAmount: 0,
    mealsList: [],
    addOrder: (order) => { },
}]);

export default OrderContext;