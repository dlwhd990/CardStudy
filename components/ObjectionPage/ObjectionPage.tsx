import Objection from "../../model/objection";
import { useAppSelector } from "../../store/hooks";
import ObjectionPageItem from "../ObjectionPageItem/ObjectionPageItem";
import styles from "./ObjectionPage.module.css";

const ObjectionPage = () => {
  const userObjectionList = useAppSelector((state) => state.userObjection.list);
  return (
    <div className={styles.objection_page}>
      <h2>알림</h2>
      <div className={styles.list_container}>
        <div className={styles.list_top}>
          <p
            className={styles.mobile_top}
          >{`알림 총 ${userObjectionList.length} 건`}</p>
          <p className={styles.title}>제목</p>
          <p className={styles.content}>내용</p>
          <p className={styles.date}>일시</p>
        </div>
        <ul className={styles.objection_list}>
          {userObjectionList.map((objection: Objection) => (
            <ObjectionPageItem
              key={objection._id.toString()}
              objection={objection}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ObjectionPage;
