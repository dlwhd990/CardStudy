import {
  faFolderOpen,
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import styles from "./StudyItem.module.css";

const StudyItem = () => {
  return (
    <Fragment>
      <div className={styles.study_item}>
        <FontAwesomeIcon icon={faFolderOpen} className={styles.icon} />
        <p className={styles.title}>
          운영체제 중간고사 정리운영체제 중간고사 정리운영체제 중간고사
          정리운영체제 중간고사 정리운영체제 중간고사 정리
        </p>
        <div className={styles.update_and_delete_button}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className={styles.update_icon}
          />
          <FontAwesomeIcon icon={faTrashCan} className={styles.delete_icon} />
        </div>
      </div>
      <button className={styles.add_button}>
        <FontAwesomeIcon icon={faPlus} className={styles.plus_icon} />
        <span>이 폴더에 새로운 문제 추가</span>
      </button>
    </Fragment>
  );
};

export default StudyItem;
