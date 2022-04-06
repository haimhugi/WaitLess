import React from 'react';
import { Row, Col } from 'antd';

const Footer = () => {
    return (
        <Row style={{ textAlign: 'center' }}>
            <Col span={8}>אודות</Col>
            <Col span={8}>צור קשר</Col>
            <Col span={8}>זכויוית שמורות</Col>
        </Row>
    );
};

export default Footer;