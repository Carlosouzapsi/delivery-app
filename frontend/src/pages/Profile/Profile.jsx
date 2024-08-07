import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  // const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [originalData, setOriginalData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const fetchUserProfile = async (token) => {
    const response = await axios.get(url + "/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.success) {
      console.log(response.data.data);
      const { name, email, password } = response.data.data.data;
      setData({ ...data, name, email, password });
      setOriginalData({ name, email, password });
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserProfile(token);
    }
  }, [token]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const updateUser = async (event) => {
    event.preventDefault();
    let updateFields = {};

    if (data.name !== originalData.name) {
      updateFields.name = data.name;
    }
    if (data.password && data.password !== originalData.password) {
      if (data.password !== data.confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }
      if (data.password.length <= 5) {
        setMessage("Please type a stronger password");
      }
      updateFields = data.password;
    }
    try {
      const response = await axios.patch(url + "/user/profile", updateFields, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        setOriginalData({ ...originalData, ...updateFields });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="profile-container">
      <form onSubmit={updateUser} autoComplete="off" className="profile-info">
        <h2 className="title">Profile</h2>
        <div className="multi-fields">
          <input
            data-cy={"profile-name-input"}
            name="name"
            type="text"
            placeholder="User name"
            value={data.name}
            onChange={onChangeHandler}
            autoComplete="off"
            required
          />
          <input
            name="email"
            type="email"
            value={data.email}
            onChange={onChangeHandler}
            data-cy={"profile-email-input"}
            autoComplete="off"
            readOnly
          />
          <input
            name="password"
            type="password"
            value={data.password}
            onChange={onChangeHandler}
            data-cy={"profile-password-input"}
            placeholder="New password"
          />
          <input
            name="confirmPassword"
            type="password"
            value={data.confirmPassword}
            onChange={onChangeHandler}
            data-cy={"profile-confirm-new-password-input"}
            placeholder="Confirm new password"
          />
        </div>
        <button type="submit">Save Changes</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Profile;
