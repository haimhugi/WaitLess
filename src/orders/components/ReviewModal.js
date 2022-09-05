import React from 'react';
import { useHistory } from 'react-router-dom';


import { Rate } from 'antd';
import "antd/dist/antd.css";

import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';

const ReviewModal = props => {
    const { error, sendRequest, clearError } = useHttpClient();
    const history = useHistory();


    const reviewUpdate = async (reviewNum) => {
        try {
            await sendRequest(
                `http://localhost:5001/api/meals/update-review/${props.mealName}`,
                'PATCH',
                JSON.stringify({
                    review: reviewNum
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            props.onClose();
            await sendRequest(
                `http://localhost:5001/api/orders/update-is-reviewed/${props.orderId}/${props.mealInOrderId}`,
                'PATCH',
                {
                    'Content-Type': 'application/json'
                }
            );
            history.push("/loading");
            history.push("/u1/orders");

        } catch (err) {  }

    }


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />

            <Modal onClose={props.onClose}>
                <h1>דירוג המנה</h1>
                <p>אנא דרג את לדעתך כמה המנה "{props.mealName}" הייתה טעימה</p>
                <Rate onChange={(value) => reviewUpdate(value)} allowClear={false} defaultValue={5} />
            </Modal>
        </React.Fragment>
    );
};

export default ReviewModal;