import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
    return <ul className="nav-links">
        <li>
            <NavLink to="/about">אודות</NavLink>
        </li>
        <li>
            <NavLink to="/cart">עגלה</NavLink>
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