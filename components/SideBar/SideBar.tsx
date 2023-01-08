import {
  faArrowRightFromBracket,
  faBell,
  // faHeart,
  faIdCard,
  faListCheck,
  // faPenToSquare,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useAppSelector } from "../../store/hooks";
import styles from "./SideBar.module.css";

const SideBar: React.FC<{
  changeSelectedValue: (value: string) => void;
}> = (props) => {
  const userData = useAppSelector((state) => state.userData);
  const { changeSelectedValue } = props;
  const logoutHandler = async () => {
    await axios.post("/api/logout");
    window.location.reload();
  };

  return (
    <aside className={styles.sidebar}>
      <section className={styles.user_data_container}>
        {/* 에러나서 일단 next/image는 적용하지 않음 */}
        <img
          loading="lazy"
          src={userData.picture || "/images/profile_default.jpeg"}
          alt="프로필사진"
          className={styles.user_image}
        />
        <div className={styles.name_and_welcome}>
          <p className={styles.welcome}>안녕하세요</p>
          <p className={styles.name}>{`${
            userData.name.length > 0 ? userData.name : "비회원"
          } 님`}</p>
        </div>
      </section>
      <div className={styles.menu_title_box}>메뉴</div>
      <section className={styles.menu}>
        <ul>
          <li
            className={styles.button}
            onClick={() => changeSelectedValue("problem")}
          >
            <FontAwesomeIcon icon={faListCheck} className={styles.icon_mint} />
            <span>문제 관리</span>
          </li>
          <li
            className={styles.button}
            onClick={() => changeSelectedValue("like")}
          >
            <FontAwesomeIcon icon={faStar} className={styles.icon_yellow} />
            <span>북마크</span>
          </li>
          <li
            className={styles.button}
            onClick={() => changeSelectedValue("alert")}
          >
            <FontAwesomeIcon icon={faBell} className={styles.icon_green} />
            <span>알림</span>
          </li>
          <li
            className={styles.button}
            onClick={() => changeSelectedValue("changeName")}
          >
            <FontAwesomeIcon icon={faIdCard} className={styles.icon_pink} />
            <span>닉네임 변경</span>
          </li>
          {userData.name.length > 0 && (
            <li className={styles.button} onClick={logoutHandler}>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className={styles.icon_blue}
              />
              <span>로그아웃</span>
            </li>
          )}
          {/* <li
            className={styles.button}
            onClick={() => changeSelectedValue("article")}
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              className={styles.icon_blue}
            />
            <span>나의 글</span>
          </li> */}
        </ul>
      </section>
    </aside>
  );
};

export default SideBar;
