import React, { useContext, useState, useEffect } from 'react';
import { Button } from 'antd';

import MealsList from "../components/MealsList";
import Card from "../../shared/components/UIElements/Card";
import CategoryContext from "../../store/category-context";
import EditMeal from '../components/EditMeal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Meals = props => {



    //load meals data
    const [pageChange, setPageChange] = useState(false);



    const [MEALS, setMeals] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const sendRequest = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/meals');
                const responseData = await response.json();
                setMeals(responseData.meals);
            } catch (err) {
                console.log(err);
            }
            setIsLoading(false);
        };
        sendRequest();
        setPageChange(false);
    }, [pageChange]);

    useEffect(() => { console.log(MEALS); }, [MEALS]);




    const [open, setIsOpen] = useState(false);
    const hideCreateForm = () => {
        setIsOpen(false);
    }

    const { sendRequest } = useHttpClient();

    const submitNewMeal = async (values) => {
        console.log(values, "val");
        try {
            await sendRequest(
                'http://localhost:5001/api/meals/add-meal',
                'POST',
                JSON.stringify({
                    image: values.image,
                    name: values.name,
                    description: values.description,
                    price: values.price,
                    category: values.category
                }),
                {
                    'Content-Type': 'application/json'
                }
            );

        } catch (err) {
            console.log(err);
        }

        setIsOpen(false);
        setPageChange(true);
    }

    const openCreateForm = () => {
        setIsOpen(true);
    };
    const categoryCtx = useContext(CategoryContext);









    // const MEALS = [
    //     {
    //         id: 'u1',
    //         image: 'https://images.unsplash.com/photo-1498602753442-dfa7a49fc9c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    //         name: 'שקשוקה',
    //         description: 'מוגשת חמה עם עגבניות טריות וטעימות ממש מנה מומלצת וטעימה , בנוסף מגיע עם לחם כפרי תהנו!',
    //         price: 54,
    //         reviews: 3,
    //         category: 'שקשוקות'
    //     },
    //     {
    //         id: 'u2',
    //         image: 'https://cdn.pixabay.com/photo/2018/03/31/07/43/bread-3277473_960_720.jpg',
    //         name: 'טוסט',
    //         description: 'מוגשת חמה עם עגבניות טריות וטעימות ממש מנה מומלצת וטעימה , בנוסף מגיע עם לחם כפרי תהנו!',
    //         price: 24,
    //         reviews: 8,
    //         category: 'טוסטים'
    //     },
    //     {
    //         id: 'u3',
    //         image: 'https://cdn.pixabay.com/photo/2015/05/31/13/59/salad-791891_960_720.jpg',
    //         name: 'סלט',
    //         description: 'מוגשת חמה עם עגבניות טריות וטעימות ממש מנה מומלצת וטעימה , בנוסף מגיע עם לחם כפרי תהנו!',
    //         price: 43,
    //         reviews: 2,
    //         category: 'סלטים'
    //     },
    //     {
    //         id: 'u4',
    //         image: 'https://cdn.pixabay.com/photo/2019/04/10/22/06/breakfast-4118417_960_720.jpg',
    //         name: 'ארוחת בוקר יחיד',
    //         description: 'מוגשת חמה עם עגבניות טריות וטעימות ממש מנה מומלצת וטעימה , בנוסף מגיע עם לחם כפרי תהנו!',
    //         price: 43,
    //         reviews: 12,
    //         category: 'ארוחות בוקר'
    //     },
    // ]

    if (categoryCtx.pickedCategory !== 'הכל') {
        let filteredMeals = MEALS.filter(meal => { return meal.category === categoryCtx.pickedCategory })
        console.log(filteredMeals + ' filteredMeals');
        return <React.Fragment>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            <Card>
                {props.isAdmin && <Button type="primary" danger onClick={openCreateForm}>הוסף מנה</Button>}
                {open && <EditMeal
                    id={""}
                    image={""}
                    name={""}
                    description={""}
                    price={""}
                    category={""}
                    onClose={hideCreateForm}
                    onSubmit={submitNewMeal}
                />}
                <MealsList isAdmin={props.isAdmin} items={filteredMeals} />
            </Card>
        </React.Fragment>
    }
    return <React.Fragment>
        {isLoading && (
            <div className="center">
                <LoadingSpinner />
            </div>
        )} <Card>
            {props.isAdmin && <Button type="primary" danger onClick={openCreateForm}>הוסף מנה</Button>}
            {open && <EditMeal
                id={""}
                image={""}
                name={""}
                description={""}
                price={""}
                category={""}
                onClose={hideCreateForm}
                onSubmit={submitNewMeal}
            />}
            <MealsList isAdmin={props.isAdmin} items={MEALS} setPageChange={setPageChange} /> </Card>
    </React.Fragment>
};

export default Meals;





