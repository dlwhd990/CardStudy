import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import FolderCard from "../../components/FolderCard/FolderCard";
import Folder from "../../model/folder";
import Problem from "../../model/problem";
import { useAppSelector } from "../../store/hooks";
import styles from "../../styles/searchPage.module.css";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connectToDatabase } from "../../util/mongodb";

const SearchPage: React.FC<{ searchResult: Folder[] }> = ({ searchResult }) => {
  const router = useRouter();
  const [pageNum, setPageNum] = useState(1);
  const [pageListNum, setPageListNum] = useState(0);
  const userData = useAppSelector((state) => state.userData);

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
    if ((5 + pageListNum * 5) * 8 >= searchResult.length) return;
    const nowPageListNum = pageListNum;
    setPageNum((nowPageListNum + 1) * 5 + 1);
    setPageListNum((state) => state + 1);
  };

  return (
    <main className={styles.search_page}>
      <h2>{`${router.query.query} 검색 결과`}</h2>
      <p className={styles.description}>
        {`검색 결과 총 ${searchResult.length}건`}
      </p>
      {searchResult.length === 0 ? (
        <div className={styles.message_box}>
          <p className={styles.message}>검색 결과가 없습니다!</p>
          <button
            className={styles.message_button}
            onClick={() => router.back()}
          >
            뒤로 가기
          </button>
        </div>
      ) : (
        <section className={styles.folder_card_section}>
          <ul className={styles.card_list}>
            {searchResult
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
              {(1 + pageListNum * 5) * 8 < searchResult.length && (
                <li
                  className={`${
                    pageNum === 2 + pageListNum * 5 && `${styles.page_selected}`
                  }`}
                >
                  {2 + pageListNum * 5}
                </li>
              )}
              {(2 + pageListNum * 5) * 8 < searchResult.length && (
                <li
                  className={`${
                    pageNum === 3 + pageListNum * 5 && `${styles.page_selected}`
                  }`}
                >
                  {3 + pageListNum * 5}
                </li>
              )}
              {(3 + pageListNum * 5) * 8 < searchResult.length && (
                <li
                  className={`${
                    pageNum === 4 + pageListNum * 5 && `${styles.page_selected}`
                  }`}
                >
                  {4 + pageListNum * 5}
                </li>
              )}
              {(4 + pageListNum * 5) * 8 < searchResult.length && (
                <li
                  className={`${
                    pageNum === 5 + pageListNum * 5 && `${styles.page_selected}`
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
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const db = await connectToDatabase();
  const folderCollection = db.collection("folder");
  // const problemCollection = db.collection("problem");

  const folderResult = await folderCollection
    .find({
      title: { $regex: `${context?.params?.query}` },
      public: true,
    })
    .toArray();

  // const problemResult = await problemCollection
  //   .find({
  //     $or: [
  //       { question: { $regex: `${context?.params?.query}` } },
  //       { answer: { $regex: `${context?.params?.query}` } },
  //     ],
  //   })
  //   .toArray();
  return {
    props: {
      searchResult: JSON.parse(JSON.stringify(folderResult)),
    },
  };
}

export default SearchPage;
