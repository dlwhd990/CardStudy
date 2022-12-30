import Objection from "../../model/objection";
import styles from "./ObjectionPageItem.module.css";

const ObjectionPageItem: React.FC<{ objection: Objection }> = ({
  objection,
}) => {
  return (
    <li className={styles.objection_item}>
      <p className={styles.title}>{objection.folderTitle}</p>
      <p className={styles.content}>{objection.content}</p>
      <p className={styles.date}>
        {new Date(objection.date + 1000 * 60 * 60 * 9)
          .toISOString()
          .slice(0, 10)}
      </p>
      <p></p>
    </li>
  );
};

export default ObjectionPageItem;
