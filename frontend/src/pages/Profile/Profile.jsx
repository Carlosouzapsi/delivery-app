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
      const { name, email } = response.data.data.data;
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
    <div>
      <h2>Profile</h2>
      <form action="" autoComplete="off">
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
          data-cy={"profile-email-input"}
          autoComplete="off"
        />
        <input
          data-cy={"profile-password-input"}
          type="password"
          placeholder="New password"
        />
        <input
          data-cy={"profile-confirm-new-password-input"}
          type="password"
          placeholder="Confirm new password"
        />
        <button>Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
