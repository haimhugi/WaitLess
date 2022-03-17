import React from "react";

import MealItem from "./MealItem";
import Card from '../../shared/components/UIElements/Card';
import './MealsList..css';


const MealsList = props => {
    if (props.items.length === 0) {
        return <div className="center">
            <Card>
                <h2>No meals found.</h2>
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
                    reviewCount={meal.reviews}
                />
            ))}
        </ul>
    );
};

export default MealsList;