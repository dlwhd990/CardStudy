import axios from "axios";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { removeUserData, setUserData } from "../../store/userData";
import { loadUserFolderList } from "../../store/userFolder";
import { loadUserLikeList } from "../../store/userLike";
import { loadUserObjectionList } from "../../store/userObjection";
import { loadUserProblemList } from "../../store/userProblem";
import AlertBox from "../AlertBox/AlertBox";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MobileMenu from "../MobileMenu/MobileMenu";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

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
    dispatch(loadUserLikeList());
    dispatch(loadUserObjectionList());
  }, [dispatch]);

  return (
    <Fragment>
      <Header />
      <AlertBox />
      <MobileMenu />
      <Fragment>{children}</Fragment>
      {!router.pathname.includes("mypage") && <Footer />}
    </Fragment>
  );
};

export default Layout;
