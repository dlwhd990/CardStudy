import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { showAlert } from "../../store/alert";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeFolderUpload } from "../../store/popup";
import { loadUserFolderList } from "../../store/userFolder";
import styles from "./FolderUpload.module.css";

const FolderUpload = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.userData);
  const [title, setTitle] = useState("");
  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const closePopup = () => {
    dispatch(closeFolderUpload());
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.length < 2 || title.length > 15) {
      dispatch(showAlert("제목은 2~15자로만 가능해요"));
      return;
    }
    const response = await axios.post("/api/folder", {
      title,
      userName: userData.name,
    });
    if (response.data.success) {
      dispatch(loadUserFolderList());
      dispatch(closeFolderUpload());
      dispatch(showAlert("카드 묶음이 생성되었습니다!"));
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
          <input
            value={title}
            onChange={changeTitle}
            type="text"
            id="title"
            placeholder="제목 (2~15자)"
            autoFocus
          />
          <div className={styles.submit_button}>
            <button>만들기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FolderUpload;
