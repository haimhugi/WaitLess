import { useContext } from "react";

import React from "react";
import { Link } from 'react-router-dom'
import './MealItem.css';
import Avater from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";




const MealItem = props => {

    const cartCtx = useContext(CartContext);

    const price = `₪ ${props.price.toFixed(2)}`;

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });
    };




    return (
        <li className="meal-item">
            <Card className="meal-item__content">
                <Link to={`/${props.id}/meals`}>
                    <div className="meal-item__image">
                        <Avater image={props.image} alt={props.name} />
                    </div>
                    <div className="meal-item__info">
                        <h2>{props.name}</h2>
                        <h3>
                            {props.reviewCount} {props.reviewCount === 1 ? 'review' : 'reviews'}
                        </h3>
                    </div>
                    <div>{price}</div>
                </Link>
                <div>
                    <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
                </div>
            </Card>
        </li>
    )

};

export default MealItem;