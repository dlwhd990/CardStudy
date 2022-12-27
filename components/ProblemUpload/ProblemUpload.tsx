import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { closeProblemUpload } from "../../store/popup";
import { loadUserProblemList } from "../../store/userProblem";
import styles from "./ProblemUpload.module.css";

const ProblemUpload: React.FC<{ folderId: string }> = ({ folderId }) => {
  const dispatch = useAppDispatch();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const changeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const changeAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const closePopup = () => {
    dispatch(closeProblemUpload());
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post("/api/problem", {
      question,
      answer,
      folderId,
    });
    if (response.data.success) {
      console.log(response.data);
      dispatch(loadUserProblemList());
      dispatch(closeProblemUpload());
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
        <div className={styles.top}>카드 만들기</div>
        <form onSubmit={onSubmitHandler} className={styles.form}>
          <div className={styles.input_box}>
            <label htmlFor="question">질문</label>
            <input
              value={question}
              onChange={changeQuestion}
              type="text"
              id="question"
              placeholder="질문 입력 (50자 이하)"
            />
          </div>
          <div className={styles.input_box}>
            <label htmlFor="answer">정답</label>
            <textarea
              value={answer}
              onChange={changeAnswer}
              id="answer"
              placeholder="정답 입력 (150자 이하)"
            />
          </div>
          <div className={styles.submit_button}>
            <button>만들기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProblemUpload;
