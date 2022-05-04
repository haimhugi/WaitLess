import React, { useState, useEffect } from 'react'
import { Button } from 'antd';
import { Row, Col } from 'antd';



import Card from '../../shared/components/UIElements/Card';
import PersonalDetailsControl from '../components/PersonalDetailsControl';
import CreditCardsControl from '../components/CreditCardsControl';
import DeleteAccountControl from '../components/DeleteAccountControl';


const MyProfile = () => {


    const pickedValHandler = newPickedVal => {
        setPickedValueInMyProfile(newPickedVal);
    }

    const [pickedValueInMyProfile, setPickedValueInMyProfile] = useState('פרטים אישיים');

    useEffect(() => {
        console.log('changed to ' + pickedValueInMyProfile)
    }, [pickedValueInMyProfile]);

    return (
        <Card>
            <h1>איזור אישי</h1>
            <Row >
                <Col span={6} push={18}>
                    <h1><Button onClick={() => pickedValHandler('פרטים אישיים')} >פרטים אישיים</Button></h1>
                    <h1><Button onClick={() => pickedValHandler('כרטיסי אשראי')} >כרטיסי אשראי</Button></h1>
                    <h1><Button onClick={() => pickedValHandler('מחיקת חשבון')} >מחיקת חשבון</Button> </h1>
                </Col>
                {pickedValueInMyProfile === 'פרטים אישיים' && <PersonalDetailsControl />}
                {pickedValueInMyProfile === 'כרטיסי אשראי' && <CreditCardsControl />}
                {pickedValueInMyProfile === 'מחיקת חשבון' && <DeleteAccountControl />}
            </Row>
        </Card>
    )
    /*
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
    );*/
};

export default MyProfile;