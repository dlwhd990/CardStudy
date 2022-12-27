import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { removeUserData, setUserData } from "../../store/userData";
import Header from "../Header/Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const response = await axios.post("/api/loginCheck");
      if (response.data.success) {
        dispatch(
          setUserData({
            name: response.data.name,
            picture: response.data.picture,
          })
        );
        console.log(response.data.name, response.data.picture);
      } else {
        dispatch(removeUserData());
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <Fragment>
      <Header />
      <Fragment>{children}</Fragment>
    </Fragment>
  );
};

export default Layout;
