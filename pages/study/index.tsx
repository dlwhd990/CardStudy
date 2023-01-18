import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState } from "react";
import FolderCard from "../../components/FolderCard/FolderCard";
import Folder from "../../model/folder";
import Problem from "../../model/problem";
import styles from "../../styles/studyMain.module.css";
import { connectToDatabase } from "../../util/mongodb";

const seoData = {
  title: "카드스터디 - 공부하기",
  description: "다른 사람들이 만든 카드 묶음으로 공부할 수 있어요",
  canonical: "https://card-study.vercel.app/study",
};

const StudyMain: React.FC<{ folderList: Folder[] }> = ({ folderList }) => {
  const [pageNum, setPageNum] = useState(1);
  const [pageListNum, setPageListNum] = useState(0);
  const router = useRouter();

  const changePageNum = (e: React.MouseEvent) => {
    const eventTarget = e.target as HTMLElement;
    if (eventTarget.tagName !== "LI") return;
    setPageNum(Number(eventTarget.innerHTML));
  };

  const clickArrowPrev = () => {
    if (pageListNum === 0) return;
    const nowPageListNum = pageListNum;
    setPageNum((nowPageListNum - 1) * 5 + 5);
    setPageListNum((state) => state - 1);
  };

  const clickArrowNext = () => {
    if ((5 + pageListNum * 5) * 8 >= folderList.length) return;
    const nowPageListNum = pageListNum;
    setPageNum((nowPageListNum + 1) * 5 + 1);
    setPageListNum((state) => state + 1);
  };

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
                .slice((pageNum - 1) * 8, pageNum * 8)
                .map((folder: Folder) => (
                  <li key={folder._id.toString()}>
                    <FolderCard folder={folder} count={folder.problemCount} />
                  </li>
                ))}
            </ul>
            <div className={styles.page_box}>
              <FontAwesomeIcon
                icon={faAngleLeft}
                className={styles.arrow_prev}
                onClick={clickArrowPrev}
              />
              <ul onClick={changePageNum}>
                <li
                  className={`${
                    pageNum === 1 + pageListNum * 5 && `${styles.page_selected}`
                  }`}
                >
                  {1 + pageListNum * 5}
                </li>
                {(1 + pageListNum * 5) * 8 < folderList.length && (
                  <li
                    className={`${
                      pageNum === 2 + pageListNum * 5 &&
                      `${styles.page_selected}`
                    }`}
                  >
                    {2 + pageListNum * 5}
                  </li>
                )}
                {(2 + pageListNum * 5) * 8 < folderList.length && (
                  <li
                    className={`${
                      pageNum === 3 + pageListNum * 5 &&
                      `${styles.page_selected}`
                    }`}
                  >
                    {3 + pageListNum * 5}
                  </li>
                )}
                {(3 + pageListNum * 5) * 8 < folderList.length && (
                  <li
                    className={`${
                      pageNum === 4 + pageListNum * 5 &&
                      `${styles.page_selected}`
                    }`}
                  >
                    {4 + pageListNum * 5}
                  </li>
                )}
                {(4 + pageListNum * 5) * 8 < folderList.length && (
                  <li
                    className={`${
                      pageNum === 5 + pageListNum * 5 &&
                      `${styles.page_selected}`
                    }`}
                  >
                    {5 + pageListNum * 5}
                  </li>
                )}
              </ul>
              <FontAwesomeIcon
                icon={faAngleRight}
                className={styles.arrow_next}
                onClick={clickArrowNext}
              />
            </div>
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
