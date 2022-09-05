import React, { useState, useEffect, useContext } from "react";
import { Button } from "antd";

import PersonalDetailsControl from "../components/PersonalDetailsControl";
import UpdatePassword from "../components/UpdatePassword";
import DeleteAccountControl from "../components/DeleteAccountControl";
import AuthContext from "../../store/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./MyProfile.css";

const MyProfile = () => {
  const AuthCtx = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { error, clearError } = useHttpClient();
  const [pageChange, setPageChange] = useState(false);


  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/users/${AuthCtx.userId}`
        );
        const responseData = await response.json();
        setUserName(JSON.stringify(responseData.user.name).replaceAll('"', ""));
        setUserEmail(
          JSON.stringify(responseData.user.email).replaceAll('"', "")
        );
      } catch (err) {
      }
    };
    sendRequest();
    setPageChange(false);

  }, [pageChange]);

  const pickedValHandler = (newPickedVal) => {
    setPickedValueInMyProfile(newPickedVal);
    setPageChange(true);
  };

  const [pickedValueInMyProfile, setPickedValueInMyProfile] =
    useState("פרטים אישיים");

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <div className="my-profile">
        <div className="header">
          <span>איזור אישי</span>
        </div>

        <div className="deatils">
          <div className="deatils-btn">
            <h1>
              <Button style={{ width: "100%" }} onClick={() => pickedValHandler("פרטים אישיים")}>
                פרטים אישיים
              </Button>
            </h1>
            {
              <h1>
                <Button style={{ width: "100%" }} onClick={() => pickedValHandler("עדכון סיסמה")}>
                  עדכון סיסמה
                </Button>
              </h1>
            }
            <h1>
              <Button style={{ width: "100%" }} onClick={() => pickedValHandler("מחיקת חשבון")}>
                מחיקת חשבון
              </Button>{" "}
            </h1>
          </div>

          <div>
            {pickedValueInMyProfile === "פרטים אישיים" && (
              <PersonalDetailsControl
                userId={AuthCtx.userId}
                userEmail={userEmail}
                userName={userName}
              />
            )}
            {pickedValueInMyProfile === "עדכון סיסמה" && <UpdatePassword />}
            {pickedValueInMyProfile === "מחיקת חשבון" && (
              <DeleteAccountControl />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyProfile;
