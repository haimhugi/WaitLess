import React from "react";
import EdiText from "react-editext";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./PersonalDetailsControl.css";


const PersonalDetailsControl = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();

  const onSave = async (val) => {
    if (val.includes("@")) {
      try {
        await sendRequest(
          `http://localhost:5001/api/users/update-email/${props.userId}`,
          "PATCH",
          JSON.stringify({
            email: val,
          }),
          {
            "Content-Type": "application/json",
          }
        );
      } catch (err) {
      }
    } else {
      try {
        await sendRequest(
          `http://localhost:5001/api/users/update-name/${props.userId}`,
          "PATCH",
          JSON.stringify({
            name: val,
          }),
          {
            "Content-Type": "application/json",
          }
        );
      } catch (err) {
      }
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <div>
        <div className="full-name">
          <h1>שם מלא:</h1>
          <EdiText
            type="text"
            buttonsAlign="after"
            value={props.userName}
            onSave={onSave}
          />
        </div>
        <div className="email-deatils">
          <h1>איימיל:</h1>
          <EdiText
            type="text"
            buttonsAlign="after"
            value={props.userEmail}
            onSave={onSave}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default PersonalDetailsControl;
