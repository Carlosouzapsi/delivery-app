import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Profile = () => {
  // const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const fetchUserProfile = async (token) => {
    const response = await axios.get(url + "/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.success) {
      console.log(response.data.data);
      const { name, email, password } = response.data.data.data;
      setData({ ...data, name, email });
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

  return (
    <div className="profile-container">
      <form autoComplete="off" className="profile-info">
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
          />
          <input
            name="password"
            type="password"
            data-cy={"profile-password-input"}
            placeholder="New password"
          />
          <input
            name="confirm-password"
            type="confirm-password"
            data-cy={"profile-confirm-new-password-input"}
            placeholder="Confirm new password"
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
