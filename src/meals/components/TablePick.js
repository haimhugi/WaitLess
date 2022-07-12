import React, { useContext } from 'react';

import 'antd/dist/antd.css';
import { Col, Row, Button } from 'antd';

import Modal from '../../shared/components/UIElements/Modal';

import tablePickContext from '../../store/tablePick-context';




const TablePick = () => {

    const TablePickCtx = useContext(tablePickContext);


    const tablePickHandler = tableNum => {
        //update table number on user
        console.log(tableNum);
        TablePickCtx.changeTablePick(false);
    }



    return (
        <Modal onClose={tablePickHandler}>
            <h1>בחר שולחן</h1>
            <Row>
                <Col span={6}>
                    <Button onClick={() => tablePickHandler(1)} type="primary" shape="round" size="size">1</Button>
                </Col>
                <Col span={6}>
                    <Button onClick={() => tablePickHandler(2)} type="primary" shape="round" size="size">2</Button>
                </Col>
                <Col span={6}>
                    <Button onClick={() => tablePickHandler(3)} type="primary" shape="round" size="size">3</Button>
                </Col>
                <Col span={6}>
                    <Button onClick={() => tablePickHandler(4)} type="primary" shape="round" size="size">4</Button>
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Button onClick={() => tablePickHandler(5)} type="primary" shape="round" size="size">5</Button>
                </Col>
                <Col span={6}>
                    <Button onClick={() => tablePickHandler(6)} type="primary" shape="round" size="size">6</Button>
                </Col>
                <Col span={6}>
                    <Button onClick={() => tablePickHandler(7)} type="primary" shape="round" size="size">7</Button>
                </Col>
                <Col span={6}>
                    <Button onClick={() => tablePickHandler(8)} type="primary" shape="round" size="size">8</Button>
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Button onClick={() => tablePickHandler(9)} type="primary" shape="round" size="size">9</Button>
                </Col>
                <Col span={6}>
                    <Button onClick={() => tablePickHandler(10)} type="primary" shape="round" size="size">10</Button>
                </Col>
                <Col span={6}>
                    <Button onClick={() => tablePickHandler(11)} type="primary" shape="round" size="size">11</Button>
                </Col>
                <Col span={6}>
                    <Button onClick={() => tablePickHandler(12)} type="primary" shape="round" size="size">12</Button>
                </Col>
            </Row>
        </Modal>
    );
};

export default TablePick;