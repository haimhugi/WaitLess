import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { Button, Popconfirm } from "antd";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AuthContext from "../../store/auth-context";

const DeleteAccountControl = () => {
  const history = useHistory();
  const { error, sendRequest, clearError } = useHttpClient();
  const AuthCtx = useContext(AuthContext);

  const confirm = async () => {
    try {
      await sendRequest(
        `http://localhost:5001/api/users/deleteUser/${AuthCtx.userId}`,
        "DELETE"
      );
    } catch (err) {
      console.log(err);
    }
    AuthCtx.changeToLoggedOut();
    history.push("/auth");
  };
  const cancel = () => {
    history.push("/meals");
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <h1 style={{ color: "white", direction: "rtl" }}>
        האם אתה בטוח שאתה רוצה למחוק את החשבון?
      </h1>
      <Popconfirm
        title="?בטוח שברצונך רוצה למחוק את החשבון שלך לצמיתות"
        onConfirm={confirm}
        onVisibleChange={() => console.log("visible change")}
      >
        <Button style={{ margin: "10px" }} danger type="primary">
          מחק
        </Button>
        <Button type="primary" onClick={cancel}>
          בטל
        </Button>
      </Popconfirm>
    </React.Fragment>
  );
};

export default DeleteAccountControl;
