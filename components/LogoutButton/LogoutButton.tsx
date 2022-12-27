import axios from "axios";
import styles from "./LogoutButton.module.css";

const LogoutButton = () => {
  const logoutHandler = async () => {
    await axios.post("/api/logout");
    window.location.reload();
  };
  return (
    <button className={styles.logout_button} onClick={logoutHandler}>
      로그아웃
    </button>
  );
};

export default LogoutButton;
