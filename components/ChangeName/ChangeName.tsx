import axios from "axios";
import React, { useState } from "react";
import { showAlert } from "../../store/alert";
import { useAppDispatch } from "../../store/hooks";
import { changeUserName } from "../../store/userData";
import styles from "./ChangeName.module.css";

const ChangeName = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("");

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.length < 2 || inputValue.length > 6) {
      dispatch(showAlert("닉네임은 2~6자만 가능해요"));
      return;
    }
    const response = await axios.patch("/api/name", { name: inputValue });
    if (response.data.success) {
      dispatch(changeUserName(inputValue));
      setInputValue("");
      dispatch(showAlert("닉네임이 변경되었습니다!"));
    }
  };
  return (
    <div className={styles.form_container}>
      <form onSubmit={onSubmitHandler} className={styles.change_name_form}>
        <label htmlFor="name">변경할 닉네임</label>
        <div className={styles.input_and_button}>
          <input
            value={inputValue}
            onChange={changeInputValue}
            type="text"
            id="name"
            placeholder="닉네임 (2~6자)"
            autoFocus
          />
          <button>변경</button>
        </div>
      </form>
    </div>
  );
};

export default ChangeName;
