import React from 'react';
import { Row, Col } from 'antd';

const Footer = () => {
    return (
        <Row style={{ textAlign: 'center' }}>
            <Col span={8}>🛈 אודות</Col>
            <Col span={8}><a href="tel:0545597435">☎ צור קשר</a>
            </Col>
            <Col span={8}>© זכויות שמורות</Col>
        </Row>
    );
};

export default Footer;