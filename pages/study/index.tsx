import { useRouter } from "next/router";
import FolderCard from "../../components/FolderCard/FolderCard";
import Folder from "../../model/folder";
import Problem from "../../model/problem";
import { useAppSelector } from "../../store/hooks";
import styles from "../../styles/studyMain.module.css";
import { connectToDatabase } from "../../util/mongodb";

const StudyMain: React.FC<{ folderList: Folder[]; problemList: Problem[] }> = ({
  folderList,
  problemList,
}) => {
  const userData = useAppSelector((state) => state.userData);
  const router = useRouter();

  return (
    <main className={styles.main}>
      <h2>공부하기</h2>
      <p className={styles.description}>
        다른 회원들의 카드 묶음으로 공부할 수 있어요
      </p>
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
      ) : folderList.length === 0 ? (
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
          {folderList.map((folder: Folder) => (
            <FolderCard
              key={folder._id.toString()}
              folder={folder}
              count={
                problemList.filter(
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

export async function getStaticProps() {
  const db = await connectToDatabase();
  const folderCollection = db.collection<Folder>("folder");
  const problemCollection = db.collection<Folder>("problem");
  const folderList = await folderCollection.find({ public: true }).toArray();
  const problemList = await problemCollection.find({}).toArray();

  return {
    props: {
      folderList: JSON.parse(JSON.stringify(folderList)),
      problemList: JSON.parse(JSON.stringify(problemList)),
    },
  };
}

export default StudyMain;
