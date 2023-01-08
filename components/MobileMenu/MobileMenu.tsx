import {
  faArrowRightFromBracket,
  faBars,
  faBell,
  faFolder,
  // faHeart,
  faIdCard,
  faListCheck,
  faPenToSquare,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/router";
import { showAlert } from "../../store/alert";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeMobileMenu, closeMobileMenu } from "../../store/popup";
import SearchBox from "../SearchBox/SearchBox";
import styles from "./MobileMenu.module.css";

const MobileMenu = () => {
  const mobileMenuOn = useAppSelector((state) => state.popup.mobileMenu);
  const userData = useAppSelector((state) => state.userData);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loginHandler = async (data: { credential: string }) => {
    await axios.post(
      "/api/login",
      {},
      {
        headers: {
          authorization: data.credential,
        },
      }
    );
    window.location.reload();
  };

  const onMenuClickHandler = (uri: string) => {
    router.push(uri);
    dispatch(closeMobileMenu());
  };

  const logoutHandler = async () => {
    await axios.post("/api/logout");
    window.location.reload();
  };

  const onToggleClickHandler = () => {
    dispatch(changeMobileMenu());
  };

  return (
    <div
      className={`${styles.mobile_menu} ${
        mobileMenuOn ? `${styles.on}` : `${styles.off}`
      }`}
    >
      <FontAwesomeIcon
        icon={faBars}
        className={styles.toggle_button}
        onClick={onToggleClickHandler}
      />
      <section className={styles.user_data_container}>
        <img
          loading="lazy"
          src={userData.picture || "/images/profile_default.jpeg"}
          alt="프로필사진"
          className={styles.user_image}
        />
        {userData.name.length > 0 ? (
          <div className={styles.name_and_welcome}>
            <p className={styles.welcome}>안녕하세요</p>
            <p className={styles.name}>{`${userData.name} 님`}</p>
          </div>
        ) : (
          <div className={styles.login_container}>
            <p>로그인</p>
            <GoogleLogin
              onSuccess={(credentialResponse: any) => {
                loginHandler(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        )}
      </section>
      <section className={styles.search_section}>
        <SearchBox />
      </section>
      <section className={styles.menu}>
        <p className={styles.menu_title}>메뉴</p>
        <ul className={styles.menu_list}>
          <li
            className={`${styles.button} ${styles.button_first}`}
            onClick={() => onMenuClickHandler("/study")}
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              className={styles.icon_pink}
            />
            <span>공부하기</span>
          </li>
          <li
            className={styles.button}
            onClick={() => onMenuClickHandler("/mystudy")}
          >
            <FontAwesomeIcon icon={faFolder} className={styles.icon_blue} />
            <span>나의 공부</span>
          </li>
          <li
            className={styles.button}
            onClick={() => {
              if (userData.name.length === 0) {
                dispatch(showAlert("로그인 후에 사용 가능합니다!"));
                return;
              }
              onMenuClickHandler("/mypage/problem");
            }}
          >
            <FontAwesomeIcon icon={faListCheck} className={styles.icon_mint} />
            <span>문제 관리</span>
          </li>
          <li
            className={styles.button}
            onClick={() => {
              if (userData.name.length === 0) {
                dispatch(showAlert("로그인 후에 사용 가능합니다!"));
                return;
              }
              onMenuClickHandler("/mypage/like");
            }}
          >
            <FontAwesomeIcon icon={faStar} className={styles.icon_yellow} />
            <span>북마크</span>
          </li>
          <li
            className={styles.button}
            onClick={() => {
              if (userData.name.length === 0) {
                dispatch(showAlert("로그인 후에 사용 가능합니다!"));
                return;
              }
              onMenuClickHandler("/mypage/alert");
            }}
          >
            <FontAwesomeIcon icon={faBell} className={styles.icon_green} />
            <span>알림</span>
          </li>
          <li
            className={styles.button}
            onClick={() => {
              if (userData.name.length === 0) {
                dispatch(showAlert("로그인 후에 사용 가능합니다!"));
                return;
              }
              onMenuClickHandler("/mypage/changeName");
            }}
          >
            <FontAwesomeIcon icon={faIdCard} className={styles.icon_pink} />
            <span>닉네임 변경</span>
          </li>
          {userData.name.length > 0 && (
            <li className={styles.button} onClick={logoutHandler}>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className={styles.icon_mint}
              />
              <span>로그아웃</span>
            </li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default MobileMenu;
