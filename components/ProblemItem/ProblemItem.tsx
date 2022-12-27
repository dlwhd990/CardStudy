import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProblemItem.module.css";

const ProblemItem = () => {
  return (
    <div className={styles.problem}>
      <p className={styles.question}>
        <span className={styles.q}>Q.</span>
        프로세스란 무엇을 의미합니까? 프로세스란 무엇을 의미합니까? 프로세스란
        무엇을 의미합니까?프로세스란 무엇을 의미합니까? 프로세스란 무엇을
        의미합니까? 프로세스란 무엇을 의미합니까?프로세스란 무엇을 의미합니까?
        프로세스란 무엇을 의미합니까? 프로세스란 무엇을 의미합니까?
      </p>
      <div className={styles.update_and_delete_button}>
        <FontAwesomeIcon icon={faPenToSquare} className={styles.update_icon} />
        <FontAwesomeIcon icon={faTrashCan} className={styles.delete_icon} />
      </div>
    </div>
  );
};

export default ProblemItem;
