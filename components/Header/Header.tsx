import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import UserBox from "../UserBox/UserBox";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeUserBoxState } from "../../store/userBox";

const Header = () => {
  const showUserBox = useAppSelector((state) => state.userBox.show);
  const dispatch = useAppDispatch();

  const changeShowUserBox = () => {
    dispatch(changeUserBoxState());
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link href="/" className={styles.logo}>
          <h1>CardStudy</h1>
        </Link>
        <nav className={styles.navbar}>
          <ul>
            <li>공부하기</li>
            <li>나의공부</li>
            <li>문의하기</li>
          </ul>
        </nav>
      </div>
      <div className={styles.right}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={styles.header_icon}
        />
        <div className={styles.user_container}>
          <FontAwesomeIcon
            icon={faUser}
            className={styles.header_icon}
            onClick={changeShowUserBox}
          />
          {showUserBox && <UserBox />}
        </div>
        <FontAwesomeIcon icon={faBell} className={styles.header_icon} />
      </div>
    </header>
  );
};

export default Header;
