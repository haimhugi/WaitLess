import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import { Row, Col } from 'antd';


const MyProfile = () => {
    return (
        <Card>
            <h1>איזור אישי</h1>
            <Row >
                <Col span={6} push={18}>
                    <h3>פרטים אישיים</h3>
                    <h3>כרטיסי אשראי</h3>
                    <h3> מחיקת חשבון</h3>
                    <h3> התנתק</h3>
                </Col>
                <Col span={18} pull={6}>
                    <Row>
                        <Col span={6} push={18}>
                            <h3>:שם</h3>
                            <h3>:כתובת</h3>
                            <h3>:נייד</h3>
                        </Col>
                        <Col span={18} pull={6}>
                            <h3>ישראל ישראלי</h3>
                            <h3>ישראלוב 58 תל אביב</h3>
                            <h3>0546666664</h3>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};

export default MyProfile;