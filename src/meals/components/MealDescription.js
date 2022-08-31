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
  return (
    <Card className="desc-card">
      <ErrorModal error={error} onClear={clearError} />

      <div>
        <h2>{props.name}</h2>
        <h3>{props.description}</h3>
      </div>
      <Button
        className="btn-close"
        style={{ borderRadius: '3px', backgroundColor: 'black', color: 'white', margin: '1px' }}
        onClick={props.onClose}
      >
        Close
      </Button>
    </Card>
  );
};

export default MealDescription;
