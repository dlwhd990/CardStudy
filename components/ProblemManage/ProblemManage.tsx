import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProblemItem from "../ProblemItem/ProblemItem";
import StudyItem from "../StudyItem/StudyItem";
import styles from "./ProblemManage.module.css";

const ProblemManage = () => {
  return (
    <div className={styles.manage_container}>
      <div className={styles.manager}>
        <div className={styles.top}>
          <p>문제 관리</p>
        </div>
        <div className={styles.content_box}>
          <button className={styles.add_button}>
            <FontAwesomeIcon icon={faPlus} className={styles.plus_icon} />
            <span>새로운 폴더 추가</span>
          </button>
          <StudyItem />
          <ProblemItem />
          <ProblemItem />
          <StudyItem />
          <ProblemItem />
          <ProblemItem />
          <ProblemItem />
          <StudyItem />
          <ProblemItem />
          <ProblemItem />
          <StudyItem />
          <ProblemItem />
          <ProblemItem />
          <StudyItem />
          <ProblemItem />
          <ProblemItem />
        </div>
      </div>
    </div>
  );
};

export default ProblemManage;
