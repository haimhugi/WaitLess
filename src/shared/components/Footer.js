import React from 'react';
import { Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <Row style={{
            textAlign: 'center', clear: 'both', position: 'fixed', left: '0px', right: '0px',
            height: '40px', bottom: '0', backgroundColor: '#4059AD'
        }}>
            <Col span={8} style={{ color: 'white', top: '20%', fontSize: '20' }} >
                <NavLink style={{ color: 'white', top: '20%', fontSize: '20' }} to="/about">🛈 אודות</NavLink></Col>
            <Col span={8} style={{ color: 'white', top: '20%', fontSize: '20' }}><a style={{ color: 'white', top: '20%', fontSize: '20' }} href="tel:0545597435">☎ צור קשר</a>
            </Col>
            <Col style={{ color: 'white', top: '20%', fontSize: '20' }} span={8}>
                <a style={{ color: 'white', top: '20%', fontSize: '20' }}
                    href='https://www.iprights.co.il/%D7%96%D7%9B%D7%95%D7%99%D7%95%D7%AA-%D7%A9%D7%9E%D7%95%D7%A8%D7%95%D7%AA/'>© זכויות שמורות</a>
            </Col>
        </Row>
    );
};

export default Footer;