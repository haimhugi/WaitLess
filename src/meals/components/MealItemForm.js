import React, { useRef, useState } from "react";

import { Button, Form, notification } from "antd";
import "antd/dist/antd.min.css";

import Input from "../../shared/components/UIElements/Input";
import classes from "./MealItemForm.module.css";
import EditMeal from "./EditMeal";

import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Modal from "../../shared/components/UIElements/Modal";

const MealItemForm = (props) => {
  const deleteMeal = async (id) => {
    try {
      await sendRequest(
        `http://localhost:5001/api/meals/deleteMeal/${id}`,
        "DELETE"
      );
    } catch (err) { }
    hideDeleteMealModal();
    props.setPageChange(true);
  };

  const [editMealOn, setEditMealOn] = useState(false);

  const showEditMealModal = () => {
    setEditMealOn(true);
  };
  const hideEditMealModal = () => {
    setEditMealOn(false);
  };

  const [deleteMealOn, setDeleteMealOn] = useState(false);

  const showDeleteMealModal = () => {
    setDeleteMealOn(true);
  };
  const hideDeleteMealModal = () => {
    setDeleteMealOn(false);
  };

  const openNotification = () => {
    const args = {
      message: "המנה נוספה לעגלה",
      duration: 3,
      placement: "topLeft",
    };
    notification["success"](args);
  };

  const { error, sendRequest, clearError } = useHttpClient();

  const patchMeal = async (values) => {
    try {
      await sendRequest(
        `http://localhost:5001/api/meals/${props.id}`,
        "PATCH",
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
    }
    hideEditMealModal();
    props.setPageChange(true);
  };

  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 20
    ) {
      setAmountIsValid(false);
      return;
    }
    openNotification();
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form
        className={classes.form}
        onSubmit={submitHandler}
        style={{ margin: "5px" }}
      >
        {!props.isAdmin && (
          <Input
            label="כמות"
            ref={amountInputRef}
            input={{
              id: "amount_" + props.id,
              type: "number",
              min: "1",
              max: "20",
              step: "1",
              defaultValue: "1",
            }}
          />
        )}
        {props.isAdmin && (
          <Button onClick={showEditMealModal} type="text" danger>
            ערוך מנה
          </Button>
        )}
        {props.isAdmin && (
          <Button onClick={showDeleteMealModal} type="text" danger>
            מחק מנה
          </Button>
        )}

        {!props.isAdmin && <button>הוסף מנה</button>}
        {!amountIsValid && <p>בבקשה הכנס מספר מנות תקין בין 1 ל 20</p>}
        {editMealOn && props.isAdmin && (
          <EditMeal
            onFinish={patchMeal}
            id={props.id}
            image={props.image}
            name={props.name}
            description={props.description}
            price={props.price}
            category={props.category}
            onClose={hideEditMealModal}
            onSubmit={patchMeal}
          />
        )}
        {deleteMealOn && props.isAdmin && (
          <Modal onClose={hideDeleteMealModal}>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={() => {
                deleteMeal(props.id);
              }}
              autoComplete="off"
            >
              <h1 style={{ direction: "rtl" }}>האם אתה בטוח שברצונך למחוק את המנה?</h1>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
                style={{ direction: "rtl" }}
              >
                <Button type="danger" onClick={hideDeleteMealModal}>
                  לא
                </Button>
                <Button type="primary" htmlType="submit">
                  כן
                </Button>

              </Form.Item>
            </Form>
          </Modal>
        )}
      </form>
    </React.Fragment>
  );
};

export default MealItemForm;
