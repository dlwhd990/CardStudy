import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBell,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1>CardStudy</h1>
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

        <FontAwesomeIcon icon={faUser} className={styles.header_icon} />
        <FontAwesomeIcon icon={faBell} className={styles.header_icon} />
      </div>
    </header>
  );
};

export default Header;
