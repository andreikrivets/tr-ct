import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../actions/auth";

const useAuth = () => {
  const [expired, setExpired] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const logOutUser = useCallback(() => {
    dispatch(logOut());
  }, []);

  const checkIfExpired = () => {
    if (user) {
      const { loginDate } = user;
      if (!(loginDate > Date.now() - 60 * 60 * 1000)) {
        setExpired(true);
        logOutUser();
      }
    } else setExpired(false);
    return expired;
  };

  return { checkIfExpired, expired };
};

export default useAuth;
