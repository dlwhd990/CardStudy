import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import Problem from "../../model/problem";
import { useAppDispatch } from "../../store/hooks";
import { loadUserProblemList } from "../../store/userProblem";
import UpdateNameForm from "../UpdateNameForm/UpdateNameForm";
import styles from "./ProblemItem.module.css";

const ProblemItem: React.FC<{ problem: Problem }> = ({ problem }) => {
  const dispatch = useAppDispatch();
  const [updateOpen, setUpdateOpen] = useState(false);

  const deleteProblem = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const confirm: boolean = window.confirm(
      "정말로 삭제하시겠습니까? 삭제한 문제는 복구가 불가능합니다!"
    );
    if (!confirm) return;
    const response = await axios.delete(
      `/api/problem/${problem._id.toString()}`
    );
    if (response.data.success) {
      dispatch(loadUserProblemList());
    }
  };

  const openUpdate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUpdateOpen((state) => !state);
  };

  const updateProblem = async (newQuestion: string) => {
    const response = await axios.patch(
      `/api/problem/${problem._id.toString()}`,
      {
        question: newQuestion,
      }
    );
    console.log(response);

    if (response.data.success) {
      dispatch(loadUserProblemList());
      setUpdateOpen(false);
    }
  };

  return (
    <div className={styles.problem}>
      <div className={styles.question}>
        <span className={styles.q}>Q.</span>
        {updateOpen ? (
          <UpdateNameForm
            updateFunc={updateProblem}
            minLength={1}
            maxLength={50}
            placeholder="질문 변경 (50자 이하)"
          />
        ) : (
          <span>{problem.question}</span>
        )}
      </div>
      <div className={styles.update_and_delete_button}>
        <FontAwesomeIcon
          icon={faPenToSquare}
          className={styles.update_icon}
          onClick={openUpdate}
        />
        <FontAwesomeIcon
          icon={faTrashCan}
          className={styles.delete_icon}
          onClick={deleteProblem}
        />
      </div>
    </div>
  );
};

export default ProblemItem;
