import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import Problem from "../../model/problem";
import { showAlert } from "../../store/alert";
import { useAppDispatch } from "../../store/hooks";
import { loadUserProblemList } from "../../store/userProblem";
import UpdateNameForm from "../UpdateNameForm/UpdateNameForm";
import styles from "./AnswerItem.module.css";

const AnswerItem: React.FC<{ problem: Problem }> = ({ problem }) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const dispatch = useAppDispatch();

  const openUpdate = () => {
    setUpdateOpen((state) => !state);
  };

  const updateAnswer = async (newAnswer: string) => {
    const response = await axios.patch(
      `/api/answer/${problem._id.toString()}`,
      {
        answer: newAnswer,
      }
    );

    if (response.data.success) {
      dispatch(loadUserProblemList());
      setUpdateOpen(false);
      dispatch(showAlert("답변이 변경되었습니다!"));
    }
  };

  return (
    <div className={styles.answer_container}>
      <div className={styles.answer}>
        <span className={styles.a}>A.</span>
        {updateOpen ? (
          <UpdateNameForm
            updateFunc={updateAnswer}
            isTextArea={true}
            prevName={problem.answer}
            minLength={1}
            maxLength={150}
            placeholder="답변 변경 (150자 이하)"
          />
        ) : (
          <span>{problem.answer}</span>
        )}
      </div>
      <div className={styles.update_and_delete_button}>
        <FontAwesomeIcon
          icon={faPenToSquare}
          className={styles.update_icon}
          onClick={openUpdate}
        />
      </div>
    </div>
  );
};

export default AnswerItem;
