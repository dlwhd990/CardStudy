import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styles from "../styles/errorPage.module.css";

const ErrorPage = () => {
  const router = useRouter();

  const moveToHomePage = () => {
    window.scrollTo({ top: 0 });
    router.push("/");
  };

  return (
    <div className={styles.error_page}>
      <div className={styles.container}>
        <FontAwesomeIcon icon={faTriangleExclamation} className={styles.icon} />
        <p className={styles.message}>잘못된 접근입니다</p>
        <button className={styles.button} onClick={moveToHomePage}>
          메인으로
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
