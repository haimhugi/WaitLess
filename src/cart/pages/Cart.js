import CartContext from '../../store/cart-context'

import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import Card from '../../shared/components/UIElements/Card';
import CartItem from '../components/CartItem';
import classes from './Cart.module.css';
import OrderContext from '../../store/orders-context';



const Cart = () => {

    const history = useHistory();

    const cartCtx = useContext(CartContext);
    const ordersCtx = useContext(OrderContext);

    const totalAmount = `₪${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };
    const createOrderHandler = () => {

        console.log('all orders in ordersCtx ', ordersCtx);

        const unique_id = uuid();
        const small_id = unique_id.slice(0, 8);

        ordersCtx.ordersList.current[0].addOrder({
            orderId: small_id,
            date: new Date().toLocaleString() + "",
            totalPayed: cartCtx.totalAmount,
            mealsAmount: cartCtx.items.length,
            mealsList: cartCtx.items
        })
        let size = cartCtx.items.length
        for (let i = 0; i < size; i++) {
            cartCtx.removeItem(cartCtx.items[i].id);
        }




        history.push("/u1/orders");
    }

    useEffect(() => {
        console.log('this is cartCtx in cart' + JSON.stringify(cartCtx));
    }, [cartCtx]);

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );
    const divStyle = {
        width: '100%'
    };
    if (cartCtx.items.length === 0) {
        return <div style={divStyle}>
            <Card>
                <h2>אין מוצרים בעגלה</h2>
            </Card>
        </div >
    }

    return (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>{totalAmount}</span>
                <span>סכום סופי</span>
            </div>
            <div className={classes.actions}>
                {hasItems && <button onClick={createOrderHandler} className={classes.button}>לתשלום וסיום ההזמנה</button>}
            </div>
        </React.Fragment>
    );
}
export default Cart;