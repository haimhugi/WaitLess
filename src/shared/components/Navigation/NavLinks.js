import CartContext from '../../../store/cart-context';

import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';


import './NavLinks.css';

const NavLinks = props => {
    const cart = useContext(CartContext);
    return <ul className="nav-links">
        <li>
            <NavLink to="/about">אודות</NavLink>
        </li>
        <li>
            <NavLink id="cartLink" to="/cart">  <ShoppingCartOutlined /> {cart.items.reduce((a, b) => a = a + b.amount, 0)} עגלה    </NavLink>
        </li>
        <li>
            <NavLink to="/u1/orders">ההזמנות שלי</NavLink>
        </li>
        <li>
            <NavLink to="/myprofile">איזור אישי</NavLink>
        </li>
        <li>
            <NavLink to="/meals">תפריט</NavLink>
        </li>
        <li>
            <NavLink to="/auth">הרשמה והתחברות</NavLink>
        </li>
    </ul>
};

export default NavLinks;