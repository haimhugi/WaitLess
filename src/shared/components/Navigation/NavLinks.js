import CartContext from '../../../store/cart-context';
import AuthContext from '../../../store/auth-context';

import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import ErrorModal from '../UIElements/ErrorModal';
import LoadingSpinner from '../UIElements/LoadingSpinner';

import { ShoppingCartOutlined } from '@ant-design/icons';

import { useHttpClient } from '../../hooks/http-hook';


import './NavLinks.css';

const NavLinks = props => {
    const [isLoading, setIsLoading] = useState(false);

    const userId = useParams().userId;
    const history = useHistory();

    const { error, sendRequest, clearError } = useHttpClient();

    const cart = useContext(CartContext);
    const AuthCtx = useContext(AuthContext);
    const logoutHandler = async () => {

        if (await window.confirm("Are you sure you want to logout?")) {
            props.TablePickToTrue();

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
                AuthCtx.changeToLoggedOut();
            } catch (err) {
            }
            setIsLoading(true);
            setTimeout(function () {
                setIsLoading(false)
            }, 50);


            history.push("/auth");
        }
        else {
            history.goBack();
        }
    }

    useEffect(() => {
    }, [AuthCtx]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && <ul className="nav-links">
                <li>
                    {AuthCtx.isLoggedIn && <NavLink onClick={logoutHandler} to="/auth" >התנתקות</NavLink>}
                </li>
                <li>
                    {!props.isAdmin && <NavLink to="/about">אודות</NavLink>}
                </li>
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
            </ul>}
        </React.Fragment>)
};

export default NavLinks;