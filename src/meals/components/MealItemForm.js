import React, { useRef, useState, useEffect } from 'react';

import { Button } from 'antd';
import 'antd/dist/antd.css';

import Input from '../../shared/components/UIElements/Input'
import classes from './MealItemForm.module.css'
import EditMeal from './EditMeal';

import { useHttpClient } from '../../shared/hooks/http-hook';

const MealItemForm = props => {


    const [editMealOn, setEditMealOn] = useState(false);

    const showEditMealModal = () => {
        setEditMealOn(true);
    }
    const hideEditMealModal = () => {
        setEditMealOn(false);
    }

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const patchMeal = async (values) => {
            try {
                await sendRequest(
                    `http://localhost:5001/api/meals/${values.id}`,
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
            } catch (err) { }
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
                {!props.isAdmin && <button>הוסף מנה</button>}
                {!amountIsValid && <p>בבקשה הכנס מספר מנות תקין בין 1 ל 20</p>}
                {editMealOn && props.isAdmin &&
                    <EditMeal
                        id={props.id}
                        image={props.image}
                        name={props.name}
                        description={props.description}
                        price={props.price}
                        category={props.category}
                        onClose={hideEditMealModal}
                        onSubmit={patchMeal}
                    />}
            </form>
        </React.Fragment>
    );
};

export default MealItemForm;