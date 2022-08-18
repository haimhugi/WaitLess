import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';


import { Button, Popconfirm } from 'antd';

import { useHttpClient } from '../../shared/hooks/http-hook';
import AuthContext from '../../store/auth-context';


const DeleteAccountControl = () => {
    const history = useHistory();
    const { sendRequest } = useHttpClient();
    const AuthCtx = useContext(AuthContext);

    const confirm = async () => {
        try {
            await sendRequest(
                `http://localhost:5001/api/users/deleteUser/${AuthCtx.userId}`,
                'DELETE'
            );
        } catch (err) { console.log(err); }
        AuthCtx.changeToLoggedOut();
        history.push("/auth")
    }
    return (
        <div>
            <h1>?האם אתה בטוח שאתה רוצה למחוק את החשבון</h1>
            <Popconfirm
                title="?בטוח שברצונך רוצה למחוק את החשבון שלך לצמיתות"
                onConfirm={confirm}
                onVisibleChange={() => console.log('visible change')}
            >
                <Button danger type="primary">מחק</Button>
            </Popconfirm>
        </div>
    );
};

export default DeleteAccountControl;