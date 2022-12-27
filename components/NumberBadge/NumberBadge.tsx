import styles from "./NumberBadge.module.css";

const NumberBadge: React.FC<{ num: number }> = ({ num }) => {
  return <div className={styles.badge}>{num}</div>;
};

export default NumberBadge;
