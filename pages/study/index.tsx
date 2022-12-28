import { useRouter } from "next/router";
import FolderCard from "../../components/FolderCard/FolderCard";
import Folder from "../../model/folder";
import Problem from "../../model/problem";
import { useAppSelector } from "../../store/hooks";
import styles from "../../styles/studyMain.module.css";

const StudyMain = () => {
  const userFolderList = useAppSelector((state) => state.userFolder.list);
  const userProblemList = useAppSelector((state) => state.userProblem.list);
  const userData = useAppSelector((state) => state.userData);
  const router = useRouter();

  return (
    <main className={styles.main}>
      <h2>공부하기</h2>

      {userData.name.length === 0 ? (
        <div className={styles.message_box}>
          <p className={styles.message}>🔒 로그인 후에 사용해주세요</p>
          <button
            className={styles.message_button}
            onClick={() => router.back()}
          >
            뒤로 가기
          </button>
        </div>
      ) : userFolderList.length === 0 ? (
        <div className={styles.message_box}>
          <p className={styles.message}>아직 카드 묶음이 없어요 😂</p>
          <button
            className={styles.message_button}
            onClick={() => router.push("/mypage")}
          >
            카드 묶음 만들기
          </button>
        </div>
      ) : (
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
      )}
    </main>
  );
};

export default StudyMain;
