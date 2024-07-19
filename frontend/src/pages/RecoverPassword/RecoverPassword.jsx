import React, { useContext, useState } from "react";
import "./RecoverPassword.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
const RecoverPassword = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const savePasswordChanges = (event) => {
    event.preventDefault();
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
  };

  return (
    <div className="recover-password-container">
      <form onSubmit={savePasswordChanges} action="">
        <div className="recover-password-inputs">
          <input
            type="password"
            onChange={onChangeHandler}
            name="password"
            placeholder="New Password"
          />
          <input
            type="password"
            onChange={onChangeHandler}
            name="confirmPassword"
            placeholder="Confirm New Password"
          />
          <button type="submit">SAVE CHANGES</button>
        </div>
      </form>
    </div>
  );
};

export default RecoverPassword;
