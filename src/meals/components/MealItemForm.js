import Input from '../../shared/components/UIElements/Input'
import classes from './MealItemForm.module.css'


const MealItemForm = props => {
    return (
        <form className={classes.form}>
            <Input label="Amount" input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '20',
                step: '1',
                defaultValue: '1'
            }} />
            <button>הוסף מנה</button>
        </form>
    );
};

export default MealItemForm;