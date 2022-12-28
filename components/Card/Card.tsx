import Problem from "../../model/problem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeActive } from "../../store/cardActive";
import styles from "./Card.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck, faQuestion } from "@fortawesome/free-solid-svg-icons";

const Card: React.FC<{ item: Problem }> = ({ item }) => {
  const active = useAppSelector((state) => state.cardActive.active);
  const dispatch = useAppDispatch();

  const cardClickHandler = () => {
    dispatch(changeActive());
  };

  return (
    <div
      onClick={cardClickHandler}
      className={`${styles.card_container} ${
        active ? `${styles.active}` : `${styles.off}`
      }`}
    >
      <div className={`${styles.card} ${styles.front}`}>
        {/* <FontAwesomeIcon icon={faCheck} className={styles.answer_icon} /> */}
        <p className={styles.question}>{item.question}</p>
      </div>
      <div className={`${styles.card} ${styles.back}`}>
        {/* <FontAwesomeIcon icon={faQuestion} className={styles.question_icon} /> */}
        <p className={styles.answer}>{item.answer}</p>
      </div>
    </div>
  );
};

export default Card;
