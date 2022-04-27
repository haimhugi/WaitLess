import CartContext from '../../store/cart-context'

import React, { useContext } from 'react';
import CartItem from '../components/CartItem';
import classes from './Cart.module.css';



const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `₪${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

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

    return (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>{totalAmount}</span>
                <span>סכום סופי</span>
            </div>
            <div className={classes.actions}>
                {hasItems && <button className={classes.button}>לתשלום וסיום ההזמנה</button>}
            </div>
        </React.Fragment>
    );
}
export default Cart;