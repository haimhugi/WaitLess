import React from "react";

import MealsList from "../components/MealsList";

const Meals = () => {
    const MEALS = [
        {
            id: 'u1',
            image: 'https://images.unsplash.com/photo-1498602753442-dfa7a49fc9c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
            name: 'שקשוקה',
            description: 'מוגשת חמה עם עגבניות טריות וטעימות ממש מנה מומלצת וטעימה , בנוסף מגיע עם לחם כפרי תהנו!',
            price: 54,
            reviews: 3
        }
    ]

    return <MealsList items={MEALS} />
};

export default Meals;