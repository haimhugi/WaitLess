import React, { useContext, useState } from "react";

import { Rate } from "antd";
import "antd/dist/antd.css";
import { StarOutlined } from "@ant-design/icons";

import "./MealItem.css";
import Card from "../../shared/components/UIElements/Card";
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";
import MealDescription from "./MealDescription";
import { Button } from "antd";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `₪ ${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };


  const [mealDescription, openMealDescription] = useState(false);

  const showMealDescription = () => {
    openMealDescription(!mealDescription);
  };

  return (
    <li className="meal-item">
      <Card className="meal-item__content">
        <div className="meal-item__details">
          <div className="meal-item__image">
            <img
              style={{
                height: "100%",
                width: "100%",
                borderRadius: "30px",
                objectFit: "cover",
              }}
              src={props.image}
              alt={props.name}
            />
          </div>
          <div className="meal-item__info">
            <Button
              onClick={showMealDescription}
              type="text"
              style={{ color: "white" }}
            >
              {props.name}
            </Button>
            {mealDescription && (
              <MealDescription
                name={props.name}
                description={props.description}
                onClose={showMealDescription}
              />
            )}

            <div className="meal-item__price">{price}</div>
          </div>
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Rate
            character={<StarOutlined />}
            allowHalf
            style={{ fontSize: 16, margin: "0px 5px" }}
            disabled
            value={props.reviewAverage}
          />
          <h6
            style={{ alignItems: "center", paddingTop: "10px", color: "white" }}
          >
            {props.reviewCount} {props.reviewCount === 1 ? "review" : "reviews"}
          </h6>
        </div>
      </Card>
    </li>
  );
};

export default MealItem;
