import FolderCard from "../../components/FolderCard/FolderCard";
import Folder from "../../model/folder";
import Problem from "../../model/problem";
import { useAppSelector } from "../../store/hooks";
import styles from "../../styles/studyMain.module.css";

const StudyMain = () => {
  const userFolderList = useAppSelector((state) => state.userFolder.list);
  const userProblemList = useAppSelector((state) => state.userProblem.list);

  return (
    <main className={styles.main}>
      <h2>공부하기</h2>

      <section className={styles.folder_card_section}>
        {userFolderList.map((folder: Folder) => (
          <FolderCard
            key={folder._id.toString()}
            folder={folder}
            count={
              userProblemList.filter(
                (pro: Problem) => pro.folderId === folder._id.toString()
              ).length
            }
          />
        ))}
      </section>
    </main>
  );
};

export default StudyMain;
