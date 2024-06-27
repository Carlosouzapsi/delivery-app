import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import validator from "validator";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => {
      const newData = { ...data, [name]: value };
      if (name === "email") {
        validateEmail(value);
      }
      if (name === "password") {
        validatePassword(value);
        if (currState === "Sign Up") {
          validateConfirmPassword(newData.confirmPassword, value);
        }
      }
      if (name === "name") {
        validateName(value);
      }

      if (name === "email" && currState === "Login") {
        validateEmailOnLogin(value);
      }

      if (name === "password" && currState === "Login") {
        validatePasswordOnLogin(value);
      }
      if (name === "confirmPassword" && currState === "Sign Up") {
        validateConfirmPassword(value, newData.password);
      }
      return newData;
    });
  };

  const validateEmail = (email) => {
    if (!validator.isEmail(email)) {
      setEmailError("Please type a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validateEmailOnLogin = (email) => {
    if (!validator.isEmail(email)) {
      setEmailError("Email field is required");
    } else {
      setEmailError("");
    }
  };

  const validatePasswordOnLogin = (password) => {
    if (password.length === 0) {
      setPasswordError("Password field is required");
    } else {
      setPasswordError("");
    }
  };

  const validatePassword = (password) => {
    if (password !== 0 && password.length < 5) {
      setPasswordError("Password need at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (confirmPassword !== password) {
      setConfirmPasswordError("Password does not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const validateName = (name) => {
    if (name.length === 0) {
      setNameError("Name field is required");
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
    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.data.token);
        localStorage.setItem("token", response.data.data.token);
        setShowLogin(false);
        toast.success(response.data.success);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const isSignUpDisabled =
    currState === "Sign Up" &&
    (!data.name ||
      !data.email ||
      !data.password ||
      !data.confirmPassword ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      nameError);

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
              data-cy={"name-input"}
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          {nameError && currState === "Sign Up" && (
            <p data-cy={"required-name-error-msg"} className="error">
              {nameError}
            </p>
          )}
          <input
            data-cy={"email-input"}
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="text"
            placeholder="Your email"
            required
          />
          {emailError && currState === "Sign Up" && (
            <p data-cy={"valid-email-error-msg"} className="error">
              {emailError}
            </p>
          )}
          {emailError && currState === "Login" && (
            <p data-cy={"required-email-error-msg"} className="error">
              {emailError}
            </p>
          )}

          <input
            data-cy="password-input"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
          {passwordError && currState === "Sign Up" && (
            <p data-cy={"invalid-password-error-msg"} className="error">
              {passwordError}
            </p>
          )}
          {passwordError && currState === "Login" && (
            <p data-cy={"required-password-error-msg"} className="error">
              {passwordError}
            </p>
          )}
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              data-cy="confirm-password-input"
              name="confirmPassword"
              onChange={onChangeHandler}
              value={data.confirmPassword}
              type="password"
              placeholder="Confirm Password"
              required
            />
          )}
          {confirmPasswordError && currState === "Sign Up" && (
            <p data-cy={"confirm-password-error-msg"} className="error">
              {confirmPasswordError}
            </p>
          )}
        </div>
        <button
          type="submit"
          data-cy={"sign-in-sign-up-button"}
          disabled={isSignUpDisabled}>
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
            <span
              data-cy={"login-popup-link"}
              onClick={() => setCurrState("Login")}>
              {" "}
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
