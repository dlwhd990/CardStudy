import React, { useEffect, useState } from "react";
import { showAlert } from "../../store/alert";
import { useAppDispatch } from "../../store/hooks";
import styles from "./UpdateNameForm.module.css";

const UpdateNameForm: React.FC<{
  updateFunc: (newTitle: string) => void;
  isTextArea: boolean;
  prevName: string;
  minLength: number;
  maxLength: number;
  placeholder: string;
}> = ({
  updateFunc,
  minLength,
  maxLength,
  placeholder,
  prevName,
  isTextArea,
}) => {
  const [newTitle, setNewTitle] = useState("");
  const dispatch = useAppDispatch();

  const changeNewTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewTitle(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTitle.length < minLength || newTitle.length > maxLength) {
      dispatch(showAlert(`제목은 ${minLength}~${maxLength}사이로만 가능해요`));
      return;
    }
    updateFunc(newTitle);
  };

  useEffect(() => {
    setNewTitle(prevName);
  }, [prevName]);

  return (
    <form
      className={`${styles.form} ${
        isTextArea ? `${styles.vertical}` : `${styles.horizontal}`
      }`}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
      }}
      onSubmit={onSubmitHandler}
    >
      {isTextArea ? (
        <textarea
          value={newTitle}
          onChange={changeNewTitle}
          placeholder={placeholder}
          autoFocus
        ></textarea>
      ) : (
        <input
          value={newTitle}
          onChange={changeNewTitle}
          type="text"
          placeholder={placeholder}
          autoFocus
        />
      )}
      <button>변경</button>
    </form>
  );
};

export default UpdateNameForm;
