import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { closeFolderUpload } from "../../store/popup";
import { loadUserFolderList } from "../../store/userFolder";
import styles from "./FolderUpload.module.css";

const FolderUpload = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const closePopup = () => {
    dispatch(closeFolderUpload());
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post("/api/folder", { title });
    if (response.data.success) {
      dispatch(loadUserFolderList());
      dispatch(closeFolderUpload());
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.popup}>
        <FontAwesomeIcon
          icon={faXmark}
          className={styles.close_button}
          onClick={closePopup}
        />
        <div className={styles.top}>카드묶음 만들기</div>
        <form onSubmit={onSubmitHandler} className={styles.form}>
          <label htmlFor="title">제목</label>
          <input value={title} onChange={changeTitle} type="text" id="title" />
          <div className={styles.submit_button}>
            <button>만들기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FolderUpload;
