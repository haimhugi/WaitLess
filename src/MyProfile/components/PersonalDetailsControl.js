import React from 'react'
import EdiText from 'react-editext'

import { Row, Col } from 'antd';

const PersonalDetailsControl = () => {


    const onSave = val => {
        console.log('Edited Value -> ', val)
    }




    return (
        <Col span={18} pull={6}>
            <Row>
                <Col span={6} push={18}>
                    <h1>:שם</h1>
                    <h1>:כתובת</h1>
                    <h1>:נייד</h1>
                </Col>
                <Col span={18} pull={6}>
                    <EdiText
                        type='text'
                        buttonsAlign='before'
                        value='ישראל ישראלי'
                        onSave={onSave}
                    />
                    <EdiText
                        type='text'
                        buttonsAlign='before'
                        value='ישראלוב 58 תל אביב'
                        onSave={onSave}
                    />
                    <EdiText
                        type='text'
                        buttonsAlign='before'
                        value='0548447865'
                        onSave={onSave}
                    />
                </Col>
            </Row>
        </Col>
    );
};

export default PersonalDetailsControl;