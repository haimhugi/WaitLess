import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom'

import { Rate } from "antd";
import "antd/dist/antd.css";


import './MealItem.css';
import Avater from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";
import MealDescription from "./MealDescription";
import { Button } from 'antd';




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

    console.log(props.reviewCount + 'props.reviewCount');

    const [mealDescription, openMealDescription] = useState(false);

    const showMealDescription = () => {
        openMealDescription(!mealDescription);
    }

    return (
        <li className="meal-item">
            <Card className="meal-item__content">
                <div className="meal-item__details">
                    <div className="meal-item__image">
                        <Avater image={props.image} alt={props.name} />
                    </div>
                    <div className="meal-item__info">
                        <Button onClick={showMealDescription} type="text">{props.name}</Button>
                        {mealDescription && <MealDescription
                            name={props.name}
                            image={props.image}
                            description={props.description}
                            onClose={showMealDescription}
                        />}
                        {/* <h2>{props.name}</h2> */}
                        <h3>
                            {props.reviewCount} {props.reviewCount === 1 ? 'review' : 'reviews'}
                        </h3>
                    </div>
                    <div>{price}</div>
                </div>
                <div>
                    <MealItemForm
                        key={props.id}
                        id={props.id}
                        image={props.image}
                        name={props.name}
                        description={props.description}
                        price={props.price}
                        reviewCount={props.reviews}
                        category={props.category}
                        onAddToCart={addToCartHandler}
                        isAdmin={props.isAdmin}
                        setPageChange={props.setPageChange}
                    />
                </div>
                <Rate disabled value={props.reviewAverage} />
            </Card>
        </li>
    )

};

export default MealItem;