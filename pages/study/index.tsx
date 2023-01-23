import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FolderCard from "../../components/FolderCard/FolderCard";
import Paging from "../../components/Paging/Paging";
import Folder from "../../model/folder";
import styles from "../../styles/studyMain.module.css";
import { connectToDatabase } from "../../util/mongodb";

const seoData = {
  title: "카드스터디 - 공부하기",
  description: "다른 사람들이 만든 카드 묶음으로 공부할 수 있어요",
  canonical: "https://card-study.vercel.app/study",
};

const itemsPerPage = 8;

const StudyMain: React.FC<{ folderList: Folder[] }> = ({ folderList }) => {
  const [pageNum, setPageNum] = useState(1);
  const router = useRouter();

  useEffect(() => {
    let page;

    if (isNaN(Number(router.query.page))) {
      page = 1;
    } else {
      page = Number(router.query.page);
    }
    setPageNum(page);
  }, [router.query.page]);

  return (
    <>
      <NextSeo {...seoData} />
      <main className={styles.main}>
        <h2>공부하기</h2>
        <p className={styles.description}>
          다른 회원들의 카드 묶음으로 공부할 수 있어요
        </p>
        {folderList.length === 0 ? (
          <div className={styles.message_box}>
            <p className={styles.message}>아직 카드 묶음이 없어요 😂</p>
            <button
              className={styles.message_button}
              onClick={() => router.push("/mypage/problem")}
            >
              카드 묶음 만들기
            </button>
          </div>
        ) : (
          <section className={styles.folder_card_section}>
            <ul className={styles.card_list}>
              {folderList
                .slice((pageNum - 1) * itemsPerPage, pageNum * itemsPerPage)
                .map((folder: Folder) => (
                  <li key={folder._id.toString()}>
                    <FolderCard folder={folder} count={folder.problemCount} />
                  </li>
                ))}
            </ul>
            <Paging
              listLength={folderList.length}
              route="study"
              itemsPerPage={itemsPerPage}
            />
          </section>
        )}
      </main>
    </>
  );
};

export async function getStaticProps() {
  const db = await connectToDatabase();
  const folderCollection = db.collection<Folder>("folder");
  const folderList = await folderCollection.find({ public: true }).toArray();
  folderList.sort((a, b) => b.date - a.date);

  return {
    props: {
      folderList: JSON.parse(JSON.stringify(folderList)),
    },
    revalidate: 10,
  };
}

export default StudyMain;
