import React from "react";
import { Link } from 'react-router-dom'
import './MealItem.css';
import Avater from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import MealItemForm from "./MealItemForm";

const MealItem = props => {
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
                </Link>
                <div>
                    <MealItemForm id={props.id} />
                </div>
            </Card>
        </li>

    );
};

export default MealItem;