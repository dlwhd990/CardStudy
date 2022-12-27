import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProblemItem from "../ProblemItem/ProblemItem";
import FolderItem from "../FolderItem/FolderItem";
import styles from "./ProblemManage.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { openFolderUpload } from "../../store/popup";
import Folder from "../../model/folder";

const ProblemManage = () => {
  const dispatch = useAppDispatch();
  const userFolderList = useAppSelector((state) => state.userFolder.list);

  const openFolderUploadPopup = () => {
    dispatch(openFolderUpload());
  };
  return (
    <div className={styles.manage_container}>
      <div className={styles.manager}>
        <div className={styles.top}>
          <p>문제 관리</p>
        </div>
        <div className={styles.content_box}>
          <button onClick={openFolderUploadPopup} className={styles.add_button}>
            <FontAwesomeIcon icon={faPlus} className={styles.plus_icon} />
            <span>새로운 폴더 추가</span>
          </button>
          {userFolderList.map((folder: Folder) => (
            <FolderItem key={folder._id.toString()} folder={folder} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemManage;
