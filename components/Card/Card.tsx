import Problem from "../../model/problem";
import styles from "./Card.module.css";

const Card: React.FC<{ item: Problem }> = ({ item }) => {
  return (
    <div className={styles.card}>
      <p className={styles.question}>{item.question}</p>
    </div>
  );
};

export default Card;
