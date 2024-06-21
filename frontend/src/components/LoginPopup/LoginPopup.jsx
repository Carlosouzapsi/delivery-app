import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import validator from "validator";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
    if (name === "email") {
      validateEmail(value);
    }
    if (name === "password") {
      validatePassword(value);
    }
    if (name === "name") {
      validateName(value);
    }
  };

  const validateEmail = (email) => {
    if (!validator.isEmail(email)) {
      setEmailError("Please type a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    if (password.length < 5) {
      setPasswordError("Password need at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const validateName = (name) => {
    if (name.length === 0) {
      setNameError("name field is required");
    } else {
      setNameError("");
    }
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/user/login";
    } else {
      newUrl += "/user/register";
    }

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.data.token);
      localStorage.setItem("token", response.data.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title" data-cy={"login-popup-title"}>
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              data-cy="name"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          {nameError && currState === "Sign Up" && (
            <p className="error">{nameError}</p>
          )}
          <input
            data-cy="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="text"
            placeholder="Your email"
            required
          />
          {emailError && currState === "Sign Up" && (
            <p className="error">{emailError}</p>
          )}
          <input
            data-cy="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
          {passwordError && currState === "Sign Up" && (
            <p className="error">{passwordError}</p>
          )}
        </div>
        <button type="submit" data-cy={"sign-in-sign-up-button"}>
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" data-cy={"privacy-policy-checkbox"} required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState("Login")}> Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
