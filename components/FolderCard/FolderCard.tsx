import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Folder from "../../model/folder";
import NumberBadge from "../NumberBadge/NumberBadge";
import styles from "./FolderCard.module.css";

const FolderCard: React.FC<{ folder: Folder; count: number }> = ({
  folder,
  count,
}) => {
  return (
    <div className={styles.folder_card}>
      <div className={styles.icon_box}>
        <NumberBadge num={count} />
        <FontAwesomeIcon icon={faFolderOpen} className={styles.folder_icon} />
      </div>
      <p className={styles.title}>{folder.title}</p>
      <button className={styles.go_button}>시작</button>
    </div>
  );
};

export default FolderCard;
