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
    </div>
  );
};

export default ProblemItem;
