import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FolderItem from "../FolderItem/FolderItem";
import styles from "./ProblemManage.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { openFolderUpload } from "../../store/popup";
import Folder from "../../model/folder";
import Problem from "../../model/problem";
import { useEffect } from "react";
import { loadUserFolderList } from "../../store/userFolder";
import { loadUserProblemList } from "../../store/userProblem";

const ProblemManage = () => {
  const dispatch = useAppDispatch();
  const userFolderList = useAppSelector((state) => state.userFolder.list);
  const userProblemList = useAppSelector((state) => state.userProblem.list);

  const openFolderUploadPopup = () => {
    dispatch(openFolderUpload());
  };

  useEffect(() => {
    dispatch(loadUserFolderList());
    dispatch(loadUserProblemList());
  }, []);
  return (
    <div className={styles.manage_container}>
      <div className={styles.manager}>
        <div className={styles.top}>
          <h2>문제 관리</h2>
        </div>
        <div className={styles.content_box}>
          <button onClick={openFolderUploadPopup} className={styles.add_button}>
            <FontAwesomeIcon icon={faPlus} className={styles.plus_icon} />
            <span>새로운 카드 묶음 추가</span>
          </button>
          {userFolderList.map((folder: Folder) => (
            <FolderItem
              key={folder._id.toString()}
              folder={folder}
              problemList={userProblemList.filter(
                (pro: Problem) => pro.folderId === folder._id.toString()
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemManage;
