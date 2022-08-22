import React, { useContext } from 'react';

import './Auth.css'

import Login from '../components/Login';
import Register from '../components/Register';

import RegisterContext from '../../store/register-context';




const Auth = () => {

    const RegisterCtx = useContext(RegisterContext);

    if (!RegisterCtx.wantRegister) return (
        <div>
            <h1 style={{ textAlign: 'left', paddingLeft: '9%', color: 'white' }}>Welcome To WaitLess</h1>
            <Login />
        </div >
    );
    else return (
        <div>
            <h1 style={{ textAlign: 'left', paddingLeft: '9%', color: 'white' }}>Welcome To WaitLess</h1>
            <Register />
        </div >
    );
};

export default Auth;