import CartContext from "../../store/cart-context";

import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";

import Card from "../../shared/components/UIElements/Card";
import CartItem from "../components/CartItem";
import classes from "./Cart.module.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AuthContext from "../../store/auth-context";

const Cart = () => {
  const AuthCtx = useContext(AuthContext);
  const { error, sendRequest, clearError } = useHttpClient();

  const history = useHistory();

  const cartCtx = useContext(CartContext);

  const totalAmount = `₪${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const createOrderHandler = async (values) => {
    const sendRequest1 = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/users/onTable/${AuthCtx.userId}`
        );
        const responseData = await response.json();
        return JSON.stringify(responseData.onTable);
      } catch (err) {
        console.log(err);
      }
    };
    const resp = await sendRequest1();
    const respo = resp.replaceAll('"', "");

    console.log(values, "val1");
    const unique_id = uuid();
    const cartCtxIdsArr = [];
    cartCtx.items.map((item) => {
      let amount = item.amount;
      while (amount > 0) {
        cartCtxIdsArr.push(item.id);
        amount--;
      }
    });
    let mealsNum = cartCtx.items.length;
    cartCtx.items.map((item) => {
      let amount = item.amount;
      while (amount > 1) {
        mealsNum++;
        amount--;
      }
    });
    let mealsWithIsReviewed = [];

    cartCtxIdsArr.forEach((element) => {
      mealsWithIsReviewed.push({ mealId: element, isReviewed: false });
    });
    console.log(mealsWithIsReviewed);
    try {
      await sendRequest(
        "http://localhost:5001/api/orders",
        "POST",
        JSON.stringify({
          orderNumber: unique_id,
          mealsNumber: mealsNum.toString(),
          totalPrice: cartCtx.totalAmount.toString(),
          date: new Date().toLocaleString() + "",
          meals: mealsWithIsReviewed,
          onTable: respo,
          creator: AuthCtx.userId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err);
    }

    let size = 0;
    let arrLength = cartCtx.items.length;

    cartCtx.items.forEach((item) => {
      size += item.amount;
    });

    for (let i = 0, z = 0; i < size && z < arrLength; ) {
      let j = 0;
      let amountInItem = cartCtx.items[z].amount;
      while (amountInItem > 0) {
        cartCtx.removeItem(cartCtx.items[z].id);
        amountInItem--;
        j++;
      }
      i = j;
      z++;
    }
    history.push("/u1/orders");
  };

  // useEffect(() => {
  //     console.log('this is userTable' + userTable);
  // }, [userTable]);

  useEffect(() => {
    console.log("this is cartCtx in cart" + JSON.stringify(cartCtx));
  }, [cartCtx]);

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const divStyle = {
    width: "100%",
  };
  if (cartCtx.items.length === 0) {
    return (
      <div style={divStyle}>
        <ErrorModal error={error} onClear={clearError} />
        <Card>
          <h2>אין מוצרים בעגלה</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className={classes.cart}>
        {cartItems}
        <div className={classes.total}>
          <span>{totalAmount}</span>
          <span>סכום סופי</span>
        </div>
        <div className={classes.actions}>
          {hasItems && (
            <button onClick={createOrderHandler} className={classes.button}>
              לתשלום וסיום ההזמנה
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
export default Cart;
