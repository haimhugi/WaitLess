import { useRef, useState } from 'react';

import Input from '../../shared/components/UIElements/Input'
import classes from './MealItemForm.module.css'


const MealItemForm = props => {
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
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                label="Amount"
                ref={amountInputRef}
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '20',
                    step: '1',
                    defaultValue: '1'
                }} />
            <button>הוסף מנה</button>
            {!amountIsValid && <p>בבקשה הכנס מספר מנות תקין בין 1 ל 20</p>}
        </form>
    );
};

export default MealItemForm;