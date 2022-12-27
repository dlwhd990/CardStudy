import axios from "axios";
import React, { useState } from "react";
import styles from "./UpdateNameForm.module.css";

const UpdateNameForm: React.FC<{
  updateFolder: (newTitle: string) => void;
}> = ({ updateFolder }) => {
  const [newTitle, setNewTitle] = useState("");

  const changeNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTitle.length < 2 || newTitle.length > 15) {
      console.log("글자 수 안내 알림 뜨도록");
      return;
    }
    updateFolder(newTitle);
  };

  return (
    <form
      className={styles.form}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
      }}
      onSubmit={onSubmitHandler}
    >
      <input
        value={newTitle}
        onChange={changeNewTitle}
        type="text"
        placeholder="변경할 이름 (2~15자)"
      />
      <button>변경</button>
    </form>
  );
};

export default UpdateNameForm;
