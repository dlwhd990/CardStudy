import axios from "axios";
import { useEffect } from "react";
import Objection from "../../model/objection";
import { useAppSelector } from "../../store/hooks";
import ObjectionPreviewItem from "../ObjectionPreviewItem/ObjectionPreviewItem";
import styles from "./ObjectionPreview.module.css";

const ObjectionPreview = () => {
  const userData = useAppSelector((state) => state.userData);
  const userObjectionList = useAppSelector((state) => state.userObjection.list);

  useEffect(() => {
    const readAllObjections = () => {
      axios.patch("/api/user/objection");
    };
    readAllObjections();
  }, []);

  return (
    <div className={styles.objection_preview}>
      <div className={styles.objection_preview_top}>알림</div>

      {userObjectionList.length > 0 && (
        <ul className={styles.objection_list}>
          {userObjectionList.slice(0, 10).map((objection: Objection) => (
            <ObjectionPreviewItem
              key={objection._id.toString()}
              objection={objection}
            />
          ))}
        </ul>
      )}
      {userObjectionList.length === 0 && (
        <div className={styles.exception_container}>
          {userData.name === "" ? (
            <p className={styles.exception}>로그인 해주세요</p>
          ) : (
            <p className={styles.exception}>알림이 없습니다</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ObjectionPreview;
