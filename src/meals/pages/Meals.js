import React from "react";

import MealsList from "../components/MealsList";
import Card from "../../shared/components/UIElements/Card";

const Meals = () => {
    const MEALS = [
        {
            id: 'u1',
            image: 'https://images.unsplash.com/photo-1498602753442-dfa7a49fc9c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
            name: 'שקשוקה',
            description: 'מוגשת חמה עם עגבניות טריות וטעימות ממש מנה מומלצת וטעימה , בנוסף מגיע עם לחם כפרי תהנו!',
            price: 54,
            reviews: 3,
            category: 'shakshokot'
        },
        {
            id: 'u2',
            image: 'https://cdn.pixabay.com/photo/2018/03/31/07/43/bread-3277473_960_720.jpg',
            name: 'טוסט',
            description: 'מוגשת חמה עם עגבניות טריות וטעימות ממש מנה מומלצת וטעימה , בנוסף מגיע עם לחם כפרי תהנו!',
            price: 24,
            reviews: 8,
            category: 'toasts'
        },
        {
            id: 'u3',
            image: 'https://cdn.pixabay.com/photo/2015/05/31/13/59/salad-791891_960_720.jpg',
            name: 'סלט',
            description: 'מוגשת חמה עם עגבניות טריות וטעימות ממש מנה מומלצת וטעימה , בנוסף מגיע עם לחם כפרי תהנו!',
            price: 43,
            reviews: 2,
            category: 'salads'
        },
        {
            id: 'u4',
            image: 'https://cdn.pixabay.com/photo/2019/04/10/22/06/breakfast-4118417_960_720.jpg',
            name: 'ארוחת בוקר יחיד',
            description: 'מוגשת חמה עם עגבניות טריות וטעימות ממש מנה מומלצת וטעימה , בנוסף מגיע עם לחם כפרי תהנו!',
            price: 43,
            reviews: 12,
            category: 'breakfasts'
        },

    ]

    return <Card> <MealsList items={MEALS} /> </Card>
};

export default Meals;





