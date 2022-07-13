import React from 'react';
import { Row, Col } from 'antd';


import './Grid.css'
import Categories from '../../../category/components/Categories'
import Meals from '../../../meals/pages/Meals';


const Grid = props => {
    return (
        <div>
            <Row>
                <Col span={6} push={18}>
                    <Categories isAdmin={props.isAdmin} />
                </Col>
                <Col span={18} pull={6}>
                    <Meals isAdmin={props.isAdmin} />
                </Col>
            </Row>
        </div>
    );
};

export default Grid;




