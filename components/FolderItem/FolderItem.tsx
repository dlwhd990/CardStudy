import {
  faFolderOpen,
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import Folder from "../../model/folder";
import Problem from "../../model/problem";
import { showAlert } from "../../store/alert";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { openProblemUpload } from "../../store/popup";
import { loadUserFolderList } from "../../store/userFolder";
import ProblemItem from "../ProblemItem/ProblemItem";
import ProblemUpload from "../ProblemUpload/ProblemUpload";
import UpdateNameForm from "../UpdateNameForm/UpdateNameForm";
import styles from "./FolderItem.module.css";

const FolderItem: React.FC<{ folder: Folder; problemList: Problem[] }> = ({
  folder,
  problemList,
}) => {
  const dispatch = useAppDispatch();

  const problemUploadOn = useAppSelector((state) => state.popup.problemUpload);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const changeOpenStatus = () => {
    setOpen((state) => !state);
  };

  const deleteFolder = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const confirm: boolean = window.confirm(
      "정말로 삭제하시겠습니까? 삭제한 카드 묶음은 복구가 불가능합니다!"
    );
    if (!confirm) return;
    const response = await axios.delete(`/api/folder/${folder._id.toString()}`);
    if (response.data.success) {
      dispatch(loadUserFolderList());
      dispatch(showAlert("카드 묶음이 삭제되었습니다!"));
    }
  };

  const openUpdate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUpdateOpen((state) => !state);
  };

  const updateFolder = async (newTitle: string) => {
    const response = await axios.patch(`/api/folder/${folder._id.toString()}`, {
      title: newTitle,
    });
    console.log(response);

    if (response.data.success) {
      dispatch(loadUserFolderList());
      setUpdateOpen(false);
      dispatch(showAlert("카드 묶음의 이름이 변경되었습니다!"));
    }
  };

  const openProblemUploadPopup = () => {
    dispatch(openProblemUpload(folder._id.toString()));
  };

  return (
    <div>
      <div className={styles.study_item} onClick={changeOpenStatus}>
        <div className={styles.title_part}>
          <FontAwesomeIcon icon={faFolderOpen} className={styles.icon} />
          {updateOpen ? (
            <UpdateNameForm
              updateFunc={updateFolder}
              minLength={2}
              maxLength={15}
              placeholder="제목 변경 (2~15자)"
            />
          ) : (
            <p className={styles.title}>{folder.title}</p>
          )}
        </div>
        <div className={styles.update_and_delete_button}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className={styles.update_icon}
            onClick={openUpdate}
          />
          <FontAwesomeIcon
            icon={faTrashCan}
            className={styles.delete_icon}
            onClick={deleteFolder}
          />
        </div>
      </div>
      {open && (
        <div className={styles.open_part}>
          <button
            onClick={openProblemUploadPopup}
            className={styles.add_button}
          >
            <FontAwesomeIcon icon={faPlus} className={styles.plus_icon} />
            <span>이 카드 묶음에 새로운 문제 추가</span>
          </button>
          {problemList.map((problem) => (
            <ProblemItem key={problem._id.toString()} problem={problem} />
          ))}
        </div>
      )}
      {problemUploadOn === folder._id.toString() && (
        <ProblemUpload folderId={folder._id.toString()} />
      )}
    </div>
  );
};

export default FolderItem;
