import Objection from "../../model/objection";
import styles from "./ObjectionPreviewItem.module.css";

const ObjectionPreviewItem: React.FC<{ objection: Objection }> = ({
  objection,
}) => {
  return (
    <li className={`${styles.item} ${!objection.read && `${styles.new_item}`}`}>
      <p className={styles.folder_title}>{`[${objection.folderTitle}]`}</p>
      <p className={styles.title}>{objection.content}</p>
      <p className={styles.reporter_and_date}>{`${
        objection.reporterName
      } | ${new Date(objection.date + 1000 * 60 * 60 * 9)
        .toISOString()
        .slice(0, 10)}`}</p>
    </li>
  );
};

export default ObjectionPreviewItem;
