import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4001";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [username, setUsername] = useState("");

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/cart/add",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/food/list");
    setFoodList(response.data.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.get(url + "/cart/list", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCartItems(response.data.data);
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/cart/remove",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        setUsername(localStorage.getItem("username"));
        const userName = username;
        console.log("aaaa" + userName);
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    setFoodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
