import React from "react";

import MealItem from "./MealItem";
import Card from '../../shared/components/UIElements/Card';
import './MealsList..css';


const MealsList = props => {
    if (props.items.length === 0) {
        return <div className="center">
            <Card>
                <h2>לא נמצאו מנות</h2>
                <h1>😞</h1>
            </Card>
        </div>
    }
    return (
        <ul className="meals-list">
            {props.items.map(meal => (
                <MealItem
                    key={meal.id}
                    id={meal.id}
                    image={meal.image}
                    name={meal.name}
                    description={meal.description}
                    price={meal.price}
                    reviewAverage={meal.review.average}
                    reviewCount={meal.review.numOfReviews}
                    category={meal.category}
                    isAdmin={props.isAdmin}
                    setPageChange={props.setPageChange}
                />
            ))}
        </ul>
    );
};

export default MealsList;