import React, { useContext, useState, useEffect } from "react";
import { Button } from "antd";

import MealsList from "../components/MealsList";
import Card from "../../shared/components/UIElements/Card";
import CategoryContext from "../../store/category-context";
import EditMeal from "../components/EditMeal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./Meals.css";

const Meals = (props) => {
  //load meals data
  const [pageChange, setPageChange] = useState(false);

  const [MEALS, setMeals] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const sendRequest = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/meals");
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

  useEffect(() => {
    console.log(MEALS);
  }, [MEALS]);

  const [open, setIsOpen] = useState(false);
  const hideCreateForm = () => {
    setIsOpen(false);
  };

  const { sendRequest, error, clearError } = useHttpClient();

  const submitNewMeal = async (values) => {
    console.log(values, "val");
    try {
      await sendRequest(
        "http://localhost:5001/api/meals/add-meal",
        "POST",
        JSON.stringify({
          image: values.image,
          name: values.name,
          description: values.description,
          price: values.price,
          category: values.category,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err);
    }

    setIsOpen(false);
    setPageChange(true);
  };

  const openCreateForm = () => {
    setIsOpen(true);
  };
  const categoryCtx = useContext(CategoryContext);

  if (categoryCtx.pickedCategory !== "הכל") {
    let filteredMeals = MEALS.filter((meal) => {
      return meal.category === categoryCtx.pickedCategory;
    });
    console.log(filteredMeals + " filteredMeals");
    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        <Card>
          {props.isAdmin && (
            <Button type="primary" onClick={openCreateForm}>
              הוסף מנה
            </Button>
          )}
          {open && (
            <EditMeal
              id={""}
              image={""}
              name={""}
              description={""}
              price={""}
              category={""}
              onClose={hideCreateForm}
              onSubmit={submitNewMeal}
            />
          )}
          <MealsList
            isAdmin={props.isAdmin}
            items={filteredMeals}
            setPageChange={setPageChange}
          />
        </Card>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}{" "}
      <Card>
        {props.isAdmin && (
          <Button className="btn-add-meal-admin" onClick={openCreateForm}>
            הוסף מנה
          </Button>
        )}
        {open && (
          <EditMeal
            id={""}
            image={""}
            name={""}
            description={""}
            price={""}
            category={""}
            onClose={hideCreateForm}
            onSubmit={submitNewMeal}
          />
        )}
        <MealsList
          isAdmin={props.isAdmin}
          items={MEALS}
          setPageChange={setPageChange}
        />{" "}
      </Card>
    </React.Fragment>
  );
};

export default Meals;
