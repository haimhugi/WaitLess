import React, { useState, useEffect, useContext } from 'react'
import { Button } from 'antd';
import { Row, Col } from 'antd';



import Card from '../../shared/components/UIElements/Card';
import PersonalDetailsControl from '../components/PersonalDetailsControl';
import UpdatePassword from '../components/UpdatePassword';
import DeleteAccountControl from '../components/DeleteAccountControl';
import AuthContext from '../../store/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';


const MyProfile = () => {
    const AuthCtx = useContext(AuthContext);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const { error, sendRequest, clearError } = useHttpClient();


    useEffect(() => {

        const sendRequest = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/users/${AuthCtx.userId}`);
                const responseData = await response.json();
                setUserName(JSON.stringify(responseData.user.name).replaceAll('"', ''));
                setUserEmail(JSON.stringify(responseData.user.email).replaceAll('"', ''));
            } catch (err) {
                console.log(err);
            }
        };
        sendRequest();
    }, []);


    const pickedValHandler = newPickedVal => {
        setPickedValueInMyProfile(newPickedVal);
    }

    const [pickedValueInMyProfile, setPickedValueInMyProfile] = useState('פרטים אישיים');

    useEffect(() => {
        console.log('changed to ' + pickedValueInMyProfile)
    }, [pickedValueInMyProfile]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card>
                <h1>איזור אישי</h1>
                <Row >
                    <Col span={6} push={18}>
                        <h1><Button onClick={() => pickedValHandler('פרטים אישיים')} >פרטים אישיים</Button></h1>
                        {<h1><Button onClick={() => pickedValHandler('עדכון סיסמה')} >עדכון סיסמה</Button></h1>}
                        <h1><Button onClick={() => pickedValHandler('מחיקת חשבון')} >מחיקת חשבון</Button> </h1>
                    </Col>
                    {pickedValueInMyProfile === 'פרטים אישיים' && <PersonalDetailsControl userId={AuthCtx.userId} userEmail={userEmail} userName={userName} />}
                    {pickedValueInMyProfile === 'עדכון סיסמה' && <UpdatePassword />}
                    {pickedValueInMyProfile === 'מחיקת חשבון' && <DeleteAccountControl />}
                </Row>
            </Card>
        </React.Fragment>
    )
};

export default MyProfile;