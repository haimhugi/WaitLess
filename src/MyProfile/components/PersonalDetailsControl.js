import React from 'react'
import EdiText from 'react-editext'

import { Row, Col } from 'antd';

import { useHttpClient } from '../../shared/hooks/http-hook';

const PersonalDetailsControl = props => {

    const { sendRequest } = useHttpClient();

    const onSave = async val => {
        if (val.includes('@')) {
            try {
                await sendRequest(
                    `http://localhost:5001/api/users/update-email/${props.userId}`,
                    'PATCH',
                    JSON.stringify({
                        email: val
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );
            } catch (err) { console.log(err); }

        }
        else {
            try {
                await sendRequest(
                    `http://localhost:5001/api/users/update-name/${props.userId}`,
                    'PATCH',
                    JSON.stringify({
                        name: val
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );
            } catch (err) { console.log(err); }
        }



        console.log('Edited Value -> ', val)
    }

    return (
        <Col span={18} pull={6}>
            <Row>
                <Col span={6} push={18}>
                    <h1>:שם מלא</h1>
                    <h1>:אימייל</h1>
                </Col>
                <Col span={18} pull={6}>
                    <EdiText
                        type='text'
                        buttonsAlign='before'
                        value={props.userName}
                        onSave={onSave}
                    />
                    <EdiText
                        type='text'
                        buttonsAlign='before'
                        value={props.userEmail}
                        onSave={onSave}
                    />
                </Col>
            </Row>
        </Col>
    );
};

export default PersonalDetailsControl;