import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Folder from "../../model/folder";

import { showAlert } from "../../store/alert";
import { useAppDispatch } from "../../store/hooks";
import NumberBadge from "../NumberBadge/NumberBadge";
import styles from "./FolderCard.module.css";

const FolderCard: React.FC<{ folder: Folder; count: number }> = ({
  folder,
  count,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const moveToStudy = () => {
    if (count === 0) {
      dispatch(showAlert("아직 문제가 등록되지 않았어요!"));
      return;
    }

    router.push(`/study/${folder._id.toString()}`);
  };

  return (
    <div className={styles.folder_card}>
      <div className={styles.icon_box}>
        <div className={styles.badge_container}>
          <NumberBadge num={count} />
        </div>
        <FontAwesomeIcon icon={faFolderOpen} className={styles.folder_icon} />
      </div>
      <p className={styles.title}>{folder.title}</p>
      <p className={styles.author}>{`by ${folder.userName} 님`}</p>
      <button className={styles.go_button} onClick={moveToStudy}>
        시작
      </button>
    </div>
  );
};

export default FolderCard;
