import React, { useRef, useState, useEffect } from 'react';

import { Button } from 'antd';
import 'antd/dist/antd.css';

import Input from '../../shared/components/UIElements/Input'
import classes from './MealItemForm.module.css'
import EditMeal from './EditMeal';


const MealItemForm = props => {


    const [editMealOn, setEditMealOn] = useState(false);

    const showEditMealModal = () => {
        setEditMealOn(true);
    }
    const hideEditMealModal = () => {
        setEditMealOn(false);
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
                    />}
            </form>
        </React.Fragment>
    );
};

export default MealItemForm;