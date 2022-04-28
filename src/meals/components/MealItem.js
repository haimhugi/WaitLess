import { useContext } from "react";

import React from "react";
import { Link } from 'react-router-dom'
import './MealItem.css';
import Avater from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";

import Salads from "./categories/Salads";
import Shakshokot from "./categories/Shakshokot";
import Toasts from "./categories/Toasts";
import Breakfasts from "./categories/Breakfasts";
import CategoryContext from "../../store/category-context";



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

    const categoryCtx = useContext(CategoryContext);



    switch (categoryCtx.pickedCategory) {
        case 'ארוחות בוקר':
            return (
                <React.Fragment>
                    {
                        props.category === 'breakfasts' ? <Breakfasts
                            key={props.id}
                            id={props.id}
                            image={props.image}
                            name={props.name}
                            description={props.description}
                            price={price}
                            reviewCount={props.reviews}
                            addToCartHandler={addToCartHandler} />
                            : ''
                    }
                </React.Fragment>
            )

        case 'ארוחות ילדים':
            return (
                <React.Fragment>

                </React.Fragment>
            )

        case 'ראשונות':
            return (
                <React.Fragment>

                </React.Fragment>
            )

        case 'כריכים':
            return (
                <React.Fragment>

                </React.Fragment>
            )

        case 'שקשוקות':
            return (
                <React.Fragment>
                    {
                        props.category === 'shakshokot' ? <Shakshokot
                            key={props.id}
                            id={props.id}
                            image={props.image}
                            name={props.name}
                            description={props.description}
                            price={price}
                            reviewCount={props.reviews}
                            addToCartHandler={addToCartHandler} />
                            : ''
                    }
                </React.Fragment>
            )
        case 'טוסטים':
            return (
                <React.Fragment>
                    {
                        props.category === 'toasts' ? <Toasts
                            key={props.id}
                            id={props.id}
                            image={props.image}
                            name={props.name}
                            description={props.description}
                            price={price}
                            reviewCount={props.reviews}
                            addToCartHandler={addToCartHandler} />
                            : ''
                    }
                </React.Fragment>
            )
        case 'מהתנור':
            return (
                <React.Fragment>

                </React.Fragment>
            )
        case 'סלטים':
            return (
                <React.Fragment>
                    {
                        props.category === 'salads' ? <Salads
                            key={props.id}
                            id={props.id}
                            image={props.image}
                            name={props.name}
                            description={props.description}
                            price={price}
                            reviewCount={props.reviews}
                            addToCartHandler={addToCartHandler} />
                            : ''
                    }
                </React.Fragment>
            )

        case 'פסטות':
            return (
                <React.Fragment>

                </React.Fragment>
            )
        case 'עיקריות':
            return (
                <React.Fragment>

                </React.Fragment>
            )
        case 'משקאות':
            return (
                <React.Fragment>

                </React.Fragment>
            )
        case 'קינוחים':
            return (
                <React.Fragment>

                </React.Fragment>
            )
        default:
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
    }


};

export default MealItem;