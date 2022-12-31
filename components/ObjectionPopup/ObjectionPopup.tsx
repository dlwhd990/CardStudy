import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import Folder from "../../model/folder";
import { showAlert } from "../../store/alert";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeObjection } from "../../store/popup";
import styles from "./ObjectionPopup.module.css";

const ObjectionPopup: React.FC<{ folder: Folder }> = ({ folder }) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.userData);
  const [content, setContent] = useState("");

  const closePopup = () => {
    dispatch(closeObjection());
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.length > 300) {
      dispatch(showAlert("최대 300자 까지만 가능합니다!"));
      return;
    }

    if (content.length === 0) {
      dispatch(showAlert("내용을 입력해주세요!"));
      return;
    }

    const response = await axios.post("/api/objection", {
      folderId: folder._id.toString(),
      folderTitle: folder.title,
      reporterName: userData.name,
      content,
      authorId: folder.userId,
    });

    if (response.data.success) {
      dispatch(showAlert("제출 완료되었습니다!"));
      dispatch(closeObjection());
    }
  };

  return (
    <div className={styles.objection_background}>
      <div className={styles.objection_popup}>
        <div className={styles.objection_top}>
          <p className={styles.title}>이의 제기</p>
          <FontAwesomeIcon
            icon={faXmark}
            className={styles.close_button}
            onClick={closePopup}
          />
        </div>
        <form className={styles.content_box}>
          <p className={styles.folder_title}>{folder.title}</p>
          <label className={styles.content_title} htmlFor="content">
            이의 내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={changeContent}
            className={styles.content}
            placeholder="이의 내용을 입력해주세요 (최대 300자)"
          ></textarea>
          <button className={styles.submit_button} onClick={onSubmitHandler}>
            제출
          </button>
        </form>
      </div>
    </div>
  );
};

export default ObjectionPopup;
