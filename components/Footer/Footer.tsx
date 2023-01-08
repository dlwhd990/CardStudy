import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faComment,
  faCube,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer_container}>
      <footer className={styles.footer}>
        <div className={styles.top}>
          <Link href="/">
            <div className={styles.logo}>
              <FontAwesomeIcon icon={faCube} className={styles.logo_icon} />
              <h1 className={styles.top}>카드스터디</h1>
            </div>
          </Link>
          <div className={styles.top_button_container}>
            <Link href="/study">
              <button>공부하기</button>
            </Link>
            <Link href="/mystudy">
              <button>나의 공부</button>
            </Link>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottom_button_container}>
            <button>
              <Link target="_blank" href="https://github.com/dlwhd990">
                <FontAwesomeIcon
                  icon={faGithub}
                  className={styles.button_icon}
                />
              </Link>
            </button>
            <button className={styles.email}>
              <div className={styles.email_tooltip}>
                이메일<br></br>dlwhd9990@gmail.com
              </div>
              <FontAwesomeIcon
                icon={faEnvelope}
                className={styles.button_icon}
              />
            </button>
            <button className={styles.kakao}>
              <div className={styles.kakao_tooltip}>
                카카오톡 ID<br></br>dlwhdgur999
              </div>
              <FontAwesomeIcon
                icon={faComment}
                className={styles.button_icon}
              />
            </button>
          </div>
          <p>2023 JongHyuk Lee</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
