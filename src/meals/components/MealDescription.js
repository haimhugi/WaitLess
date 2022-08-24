import React from "react";

import { Button, Form, Input } from "antd";
import Avater from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";

import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

import "antd/dist/antd.css";
import "./MealDescription.css";

const MealDescription = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  console.log("Meal description open");
  console.log(props);
  return (
    <Card className="desc-card">
      <ErrorModal error={error} onClear={clearError} />
      <div>
        <Avater image={props.image} alt={props.name} />
      </div>
      <div>
        <h2>{props.name}</h2>
        <h3>{props.description}</h3>
      </div>
      <Button
        className="btn-close"
        type="primary"
        shape="circle"
        size="large"
        onClick={props.onClose}
      >
        Close
      </Button>
    </Card>
  );
};

export default MealDescription;
