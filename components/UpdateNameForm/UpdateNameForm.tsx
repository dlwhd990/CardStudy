import axios from "axios";
import React, { useState } from "react";
import styles from "./UpdateNameForm.module.css";

const UpdateNameForm: React.FC<{
  updateFunc: (newTitle: string) => void;
  minLength: number;
  maxLength: number;
  placeholder: string;
}> = ({ updateFunc, minLength, maxLength, placeholder }) => {
  const [newTitle, setNewTitle] = useState("");

  const changeNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTitle.length < minLength || newTitle.length > maxLength) {
      console.log("글자 수 안내 알림 뜨도록");
      return;
    }
    updateFunc(newTitle);
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
        placeholder={placeholder}
      />
      <button>변경</button>
    </form>
  );
};

export default UpdateNameForm;
