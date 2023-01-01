import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Folder from "../../model/folder";
import Like from "../../model/like";
import { showAlert } from "../../store/alert";
import { useAppDispatch } from "../../store/hooks";
import NumberBadge from "../NumberBadge/NumberBadge";
import styles from "./FolderCard.module.css";

const FolderCard: React.FC<{ item: Folder | Like; count: number }> = ({
  item,
  count,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const moveToStudy = () => {
    let folderId;

    if (count === 0) {
      dispatch(showAlert("아직 문제가 등록되지 않았어요!"));
      return;
    }

    if ("folderId" in item) {
      // Like 타입인 경우
      folderId = item.folderId;
    } else {
      // Folder 타입인 경우
      folderId = item._id.toString();
    }

    router.push(`/study/${folderId}`);
  };

  return (
    <div className={styles.folder_card}>
      <div className={styles.icon_box}>
        <div className={styles.badge_container}>
          {count >= 0 && <NumberBadge num={count} />}
        </div>
        <FontAwesomeIcon icon={faFolderOpen} className={styles.folder_icon} />
      </div>
      <p className={styles.title}>{item.title}</p>
      <p className={styles.author}>{`by ${
        "userName" in item ? item.userName : item.authorName
      } 님`}</p>
      <button className={styles.go_button} onClick={moveToStudy}>
        시작
      </button>
    </div>
  );
};

export default FolderCard;
