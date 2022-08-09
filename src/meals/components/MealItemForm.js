import React, { useRef, useState, useEffect } from 'react';

import { Button, Form } from 'antd';
import 'antd/dist/antd.css';

import Input from '../../shared/components/UIElements/Input'
import classes from './MealItemForm.module.css'
import EditMeal from './EditMeal';

import { useHttpClient } from '../../shared/hooks/http-hook';
import Modal from '../../shared/components/UIElements/Modal';

const MealItemForm = props => {

    const deleteMeal = async id => {
        try {
            await sendRequest(
                `http://localhost:5001/api/meals/deleteMeal/${id}`,
                'DELETE'
            );
        } catch (err) { }
        console.log('remove meal with the id: ' + id);
        hideDeleteMealModal();
        //NewGET
        props.setPageChange(true);
    };


    const [editMealOn, setEditMealOn] = useState(false);

    const showEditMealModal = () => {
        setEditMealOn(true);
    }
    const hideEditMealModal = () => {
        setEditMealOn(false);
    }

    const [deleteMealOn, setDeleteMealOn] = useState(false);

    const showDeleteMealModal = () => {
        setDeleteMealOn(true);
    }
    const hideDeleteMealModal = () => {
        setDeleteMealOn(false);
    }


    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const patchMeal = async values => {
        try {
            await sendRequest(
                `http://localhost:5001/api/meals/${props.id}`,
                'PATCH',
                JSON.stringify({
                    image: values.image,
                    name: values.name,
                    description: values.description,
                    price: values.price,
                    category: values.category
                }),
                {
                    'Content-Type': 'application/json'
                }
            );

            console.log('Received values of form: ', values);
        } catch (err) {
            console.log("patch meal failed: " + err);
         }
         hideEditMealModal();
         props.setPageChange(true);
    }

    useEffect(() => {
        console.log('this is editMealOn in MealItem after changed ' + JSON.stringify(editMealOn));
    }, [editMealOn]);


    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();
    const submitHandler = event => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 20) {
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(enteredAmountNumber);
    }


    return (
        <React.Fragment>
            <form className={classes.form} onSubmit={submitHandler}>
                {!props.isAdmin && <Input
                    label="Amount"
                    ref={amountInputRef}
                    input={{
                        id: 'amount_' + props.id,
                        type: 'number',
                        min: '1',
                        max: '20',
                        step: '1',
                        defaultValue: '1'
                    }} />}
                {props.isAdmin && <Button onClick={showEditMealModal} type="text" danger>ערוך מנה</Button>}
                {props.isAdmin && <Button onClick={showDeleteMealModal} type="text" danger>מחק מנה</Button>}

                {!props.isAdmin && <button>הוסף מנה</button>}
                {!amountIsValid && <p>בבקשה הכנס מספר מנות תקין בין 1 ל 20</p>}
                {editMealOn && props.isAdmin &&
                    <EditMeal onFinish={patchMeal}
                        id={props.id}
                        image={props.image}
                        name={props.name}
                        description={props.description}
                        price={props.price}
                        category={props.category}
                        onClose={hideEditMealModal}
                        onSubmit={patchMeal}
                    />}
                {deleteMealOn && props.isAdmin &&
                    <Modal onClose={hideDeleteMealModal}>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={() => { deleteMeal(props.id) }}
                            autoComplete="off"
                        >
                            <h1>האם אתה בטוח שברצונך למחוק את המנה?</h1>
                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    כן
                                </Button>
                                <Button type="danger" onClick={hideDeleteMealModal}>
                                    לא
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>}
            </form>
        </React.Fragment>
    );
};

export default MealItemForm;