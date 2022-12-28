import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/hooks";
import { closeFolderUpload } from "../../store/popup";
import { loadUserFolderList } from "../../store/userFolder";
import styles from "./FolderUpload.module.css";

const FolderUpload = () => {
  const dispatch = useAppDispatch();
  const userData = useSelector((state) => state.userData);
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
      console.log("글자수 알림 띄우기");
      return;
    }
    const response = await axios.post("/api/folder", {
      title,
      userName: userData.name,
    });
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
          <input
            value={title}
            onChange={changeTitle}
            type="text"
            id="title"
            placeholder="제목 (2~15자)"
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
