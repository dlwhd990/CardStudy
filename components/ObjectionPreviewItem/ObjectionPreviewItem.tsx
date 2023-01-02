import { useRouter } from "next/router";
import Objection from "../../model/objection";
import { useAppDispatch } from "../../store/hooks";
import { closeObjectionPreview } from "../../store/popup";
import styles from "./ObjectionPreviewItem.module.css";

const ObjectionPreviewItem: React.FC<{ objection: Objection }> = ({
  objection,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const onClickHandler = () => {
    dispatch(closeObjectionPreview());
    router.push("/mypage/alert");
  };

  return (
    <li
      className={`${styles.item} ${!objection.read && `${styles.new_item}`}`}
      onClick={onClickHandler}
    >
      <p className={styles.folder_title}>{`[${objection.folderTitle}]`}</p>
      <p className={styles.title}>{objection.content}</p>
      <p className={styles.reporter_and_date}>{`${
        objection.reporterName
      } | ${new Date(objection.date + 1000 * 60 * 60 * 9)
        .toISOString()
        .slice(0, 10)}`}</p>
    </li>
  );
};

export default ObjectionPreviewItem;
