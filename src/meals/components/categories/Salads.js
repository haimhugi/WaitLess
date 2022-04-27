import React from "react";
import { Link } from 'react-router-dom'
import Avater from '../../../shared/components/UIElements/Avatar';
import Card from '../../../shared/components/UIElements/Card';
import MealItemForm from ".././MealItemForm";

const Salads = (props) => {
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
                    <div>{props.price}</div>
                </Link>
                <div>
                    <MealItemForm id={props.id} onAddToCart={props.addToCartHandler} />
                </div>
            </Card>
        </li>
    );
};

export default Salads;