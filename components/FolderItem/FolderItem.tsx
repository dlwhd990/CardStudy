import {
  faFolderOpen,
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Fragment, useState } from "react";
import Folder from "../../model/folder";
import { useAppDispatch } from "../../store/hooks";
import { loadUserFolderList } from "../../store/userFolder";
import UpdateNameForm from "../UpdateNameForm/UpdateNameForm";
import styles from "./FolderItem.module.css";

const FolderItem: React.FC<{ folder: Folder }> = ({ folder }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const changeOpenStatus = () => {
    setOpen((state) => !state);
  };

  const deleteFolder = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const confirm: boolean = window.confirm(
      "정말로 삭제하시겠습니까? 삭제한 폴더는 복구가 불가능합니다!"
    );
    if (!confirm) return;
    const response = await axios.delete(`/api/folder/${folder._id.toString()}`);
    if (response.data.success) {
      dispatch(loadUserFolderList());
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
    }
  };

  return (
    <Fragment>
      <div className={styles.study_item} onClick={changeOpenStatus}>
        <div className={styles.title_part}>
          <FontAwesomeIcon icon={faFolderOpen} className={styles.icon} />
          {updateOpen ? (
            <UpdateNameForm updateFolder={updateFolder} />
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
          <button className={styles.add_button}>
            <FontAwesomeIcon icon={faPlus} className={styles.plus_icon} />
            <span>이 폴더에 새로운 문제 추가</span>
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default FolderItem;
