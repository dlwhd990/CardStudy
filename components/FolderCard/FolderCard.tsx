import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Folder from "../../model/folder";
import NumberBadge from "../NumberBadge/NumberBadge";
import styles from "./FolderCard.module.css";

const FolderCard: React.FC<{ folder: Folder; count: number }> = ({
  folder,
  count,
}) => {
  const router = useRouter();

  const moveToStudy = () => {
    if (count === 0) {
      console.log("알림 띄우기");
      return;
    }
    router.push(`/study/${folder._id.toString()}`);
  };
  return (
    <div className={styles.folder_card}>
      <div className={styles.icon_box}>
        <NumberBadge num={count} />
        <FontAwesomeIcon icon={faFolderOpen} className={styles.folder_icon} />
      </div>
      <p className={styles.title}>{folder.title}</p>
      <button className={styles.go_button} onClick={moveToStudy}>
        시작
      </button>
    </div>
  );
};

export default FolderCard;
