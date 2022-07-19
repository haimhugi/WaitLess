import CartContext from '../../../store/cart-context';
import AuthContext from '../../../store/auth-context';

import React, { useContext } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';

import { ShoppingCartOutlined } from '@ant-design/icons';

import { useHttpClient } from '../../hooks/http-hook';



import './NavLinks.css';

const NavLinks = props => {

    const userId = useParams().userId;

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const cart = useContext(CartContext);
    const AuthCtx = useContext(AuthContext);
    const logoutHandler = async () => {
        props.TablePickToTrue();
        AuthCtx.changeToLoggedOut();

        try {
            await sendRequest(
                `http://localhost:5001/api/users/update-table/${AuthCtx.userId}`,
                'PATCH',
                JSON.stringify({
                    onTable: 0
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
        } catch (err) { }
    }

    return <ul className="nav-links">
        <li>
            {AuthCtx.isLoggedIn && <NavLink onClick={logoutHandler} to="/auth" >התנתקות</NavLink>}
        </li>
        {AuthCtx.isLoggedIn && !props.isAdmin && <li>
            <NavLink to="/about">אודות</NavLink>
        </li>}
        {AuthCtx.isLoggedIn && !props.isAdmin && <li>
            <NavLink id="cartLink" to="/cart">  <ShoppingCartOutlined /> {cart.items.reduce((a, b) => a = a + b.amount, 0)} עגלה    </NavLink>
        </li>}
        {AuthCtx.isLoggedIn && !props.isAdmin && <li>
            <NavLink to="/u1/orders">ההזמנות שלי</NavLink>
        </li>}
        {AuthCtx.isLoggedIn && !props.isAdmin && <li>
            <NavLink to="/myProfile">איזור אישי</NavLink>
        </li>}
        <li>
            {AuthCtx.isLoggedIn && props.isAdmin && <NavLink to="/OrderManagement">ניהול הזמנות</NavLink>}
        </li>
        {AuthCtx.isLoggedIn && <li>
            <NavLink to="/meals">תפריט</NavLink>
        </li>}
        <li>
            {!AuthCtx.isLoggedIn && <NavLink to="/auth">הרשמה והתחברות</NavLink>}
        </li>

    </ul>
};

export default NavLinks;