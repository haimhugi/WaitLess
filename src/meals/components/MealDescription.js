import React from "react";

import { Button } from "antd";
import Card from "../../shared/components/UIElements/Card";

import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

import "antd/dist/antd.min.css";
import "./MealDescription.css";

const MealDescription = (props) => {
  const { error, clearError } = useHttpClient();
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
        סגור
      </Button>
    </Card>
  );
};

export default MealDescription;
