import { useState, useEffect, SetStateAction } from "react";
import {
  getUserFromLocalStorage,
  setUserInLocalStorage,
  removeUserFromLocalStorage,
} from "../utils/authUtils";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user) {
      setUserData(user);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = (user: SetStateAction<{}>) => {
    setUserInLocalStorage(user);
    setUserData(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    removeUserFromLocalStorage();
    setUserData({});
    setIsLoggedIn(false);
  };

  return { isLoggedIn, userData, handleLoginSuccess, handleLogout };
};

export default useAuth;
