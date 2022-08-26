import React, { useContext } from "react";

import "./Auth.css";

import Login from "../components/Login";
import Register from "../components/Register";

import RegisterContext from "../../store/register-context";

const Auth = () => {
  const RegisterCtx = useContext(RegisterContext);

  if (!RegisterCtx.wantRegister)
    return (
      <div>
        <h1
          style={{
            textAlign: "center",
            paddingTop: "1%",
            color: "rgba(70, 0, 0, 0.645)",
          }}
        >
          Welcome To WaitLess
        </h1>
        <Login />
      </div>
    );
  else
    return (
      <div>
        <h1
          style={{
            textAlign: "center",
            paddingTop: "1%",
            color: "rgba(70, 0, 0, 0.645)",
          }}
        >
          Welcome To WaitLess
        </h1>
        <Register />
      </div>
    );
};

export default Auth;
