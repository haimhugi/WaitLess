import React, { useContext } from 'react';

import './Auth.css'

import Login from '../components/Login';
import Register from '../components/Register';

import RegisterContext from '../../store/register-context';




const Auth = () => {

    const RegisterCtx = useContext(RegisterContext);

    if (!RegisterCtx.wantRegister) return (
        <Login />
    );
    else return (
        <Register />
    );
};

export default Auth;