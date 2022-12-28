import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { removeUserData, setUserData } from "../../store/userData";
import { loadUserFolderList } from "../../store/userFolder";
import { loadUserProblemList } from "../../store/userProblem";
import Header from "../Header/Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 로그인 체크 => 새로고침 시 마다 실행
    const checkLoginStatus = async () => {
      const response = await axios.get("/api/loginCheck");
      if (response.data.success) {
        dispatch(
          setUserData({
            name: response.data.name,
            picture: response.data.picture,
          })
        );
      } else {
        dispatch(removeUserData());
      }
    };

    checkLoginStatus();
    // 로그인 된 사용자의 폴더 리스트 불러오기
    dispatch(loadUserFolderList());
    dispatch(loadUserProblemList());
  }, []);

  return (
    <Fragment>
      <Header />
      <Fragment>{children}</Fragment>
    </Fragment>
  );
};

export default Layout;
