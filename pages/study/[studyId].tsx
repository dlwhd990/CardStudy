import {
  faAngleLeft,
  faAngleRight,
  faComment,
  faFlag,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Card from "../../components/Card/Card";
import Problem from "../../model/problem";
import styles from "../../styles/studyPage.module.css";
const Study = () => {
  const [now, setNow] = useState(0);
  const studyTitle = "[운영체제 중간고사 정리]";
  const problemList: Problem[] = [];

  const changeNow = (query: boolean) => {
    if (query && now > 0) {
      setNow((state) => state - 1);
    } else if (!query && now < problemList.length - 1) {
      setNow((state) => state + 1);
    }
  };
  return (
    <main className={styles.study}>
      <section className={styles.card_section}>
        <p className={styles.problem_number_count}>{`${now + 1}/${
          problemList.length
        }`}</p>
        <h2 className={styles.study_title}>{studyTitle}</h2>
        <div className={styles.problem_container}>
          <FontAwesomeIcon
            icon={faAngleLeft}
            className={styles.arrow_left}
            onClick={() => changeNow(true)}
          />
          <Card item={problemList[now]} />
          <FontAwesomeIcon
            icon={faAngleRight}
            className={styles.arrow_right}
            onClick={() => changeNow(false)}
          />
        </div>
      </section>
      <section className={styles.button_container}>
        <button className={styles.study_button}>
          <FontAwesomeIcon icon={faHeart} className={styles.heart} />
          <p className={styles.button_name}>좋아요</p>
        </button>
        <button className={styles.study_button}>
          <FontAwesomeIcon icon={faComment} className={styles.comment} />
          <p className={styles.button_name}>이의제기</p>
        </button>
        <button className={styles.study_button}>
          <FontAwesomeIcon icon={faFlag} className={styles.report} />
          <p className={styles.button_name}>신고</p>
        </button>
      </section>
    </main>
  );
};

export default Study;
