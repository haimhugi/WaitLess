import React, { useState, useEffect } from "react";

import { List } from "antd";
import Card from "../../shared/components/UIElements/Card";
import ReviewModal from "./ReviewModal";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./MyOrderItem.css";

let i = 0;
const MyOrderItem = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [isLoading, setIsLoading] = useState(false);

  const [mealInOrderIdClicked, setMealInOrderIdClicked] = useState("");
  const [mealNameClicked, setMealNameClicked] = useState("");

  const [reviewModal, setReviewModal] = useState(false);

  const reviewModalOn = async () => {
    setReviewModal(true);
  };

  const reviewModalOff = () => {
    setReviewModal(false);
  };
  const [mealInOrderIdList, setMealInOrderIdList] = useState([]);
  const [mealsNameList, setMealsNameList] = useState([]);
  const [mealsIsReviewedList, setMealsIsReviewedList] = useState([]);

  useEffect(() => {
    setMealInOrderIdList([]);
    setMealsNameList([]);
    setMealsIsReviewedList([]);
    let counter = 0;
    const sendRequest1 = async () => {
      setIsLoading(true);
      props.mealsList.forEach(async (element) => {
        try {
          const response = await fetch(
            `http://localhost:5001/api/meals/${element.mealId}`
          );
          const responseData = await response.json();
          setMealsNameList((oldArray) => [
            ...oldArray,
            JSON.stringify(responseData.name),
          ]);
          setMealInOrderIdList((oldArray) => [...oldArray, element._id]);
          setMealsIsReviewedList((oldArray) => [
            ...oldArray,
            element.isReviewed,
          ]);
          counter++;
          if (props.mealsList.length === counter) {
            setIsLoading(false);
          }
        } catch (err) {
        }
      });
    };

    sendRequest1();
  }, []);

  if (props.mealsNumber === 0) return "";
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}

      {reviewModal && (
        <ReviewModal
          orderId={props.id}
          mealName={mealNameClicked}
          mealInOrderId={mealInOrderIdClicked}
          onClose={reviewModalOff}
        />
      )}

      <List>
        <List.Item>
          <Card style={{ width: "100%", textAlign: "right", fontSize: "100%" }}>
            <div>
              <p>
                {" "}
                {"בהזמנה יש"} {props.mealsNumber === 1 ? "" : props.mealsNumber}{" "}
                {props.mealsNumber === 1 ? "פריט" : "פריטים"}{" "}
                {props.mealsNumber === 1 ? "אחד" : ""}{" "}
              </p>
              <p>
                {" שולם  "} {props.totalPayed} {"שח"}{" "}
              </p>
              <p>
                {" "}
                {props.date} {"הוזמן בתאריך"}{" "}
              </p>
              <p>
                {" "}
                {props.onTable} {"הוזמן בשולחן"}{" "}
              </p>
              <p>
                {" "}
                {props.status} {"סטטוס הזמנה"}{" "}
              </p>
              <List>
                {!isLoading &&
                  mealsNameList.map(
                    (name, index) =>
                      !mealsIsReviewedList[index] && (
                        <a
                          onClick={() => {
                            setMealInOrderIdClicked(mealInOrderIdList[index]);
                            setMealNameClicked(name.replaceAll('"', ""));
                            reviewModalOn();
                          }}
                          style={{ display: "inline" }}
                          key={name + ++i}
                          dir="rtl"
                        >
                          {name + ","}
                        </a>
                      )
                  )}
                {mealsNameList.map(
                  (name, index) =>
                    mealsIsReviewedList[index] && (
                      <p
                        style={{ display: "inline" }}
                        key={name + ++i}
                        dir="rtl"
                      >
                        {" "}
                        {name + ","}
                      </p>
                    )
                )}
                <p style={{ display: "inline" }} dir="rtl">
                  {" המוצרים שהזמנת הם: "}
                </p>
                <h3 dir="rtl">{"  לכתיבת ביקורת לחץ על שם המנה  הרצויה⬆"}</h3>
              </List>
            </div>
          </Card>
        </List.Item>
      </List>
    </React.Fragment>
  );
};

export default MyOrderItem;
