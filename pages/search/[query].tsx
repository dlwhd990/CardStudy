import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FolderCard from "../../components/FolderCard/FolderCard";
import Folder from "../../model/folder";
import styles from "../../styles/searchPage.module.css";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextSeo } from "next-seo";
import axios from "axios";

const SearchPage = () => {
  const router = useRouter();
  const [searchResult, setSearchResult] = useState<Folder[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageListNum, setPageListNum] = useState(0);

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

  const seoData = {
    title: `카드스터디 - ${router.query.query}`,
    description: "카드스터디 검색 결과",
    canonical: "https://card-study.vercel.app/search",
  };

  useEffect(() => {
    const getSearchResult = async () => {
      const response = await axios.get(`/api/search/${router.query.query}`);
      setSearchResult(response.data.result);
    };

    getSearchResult();
  }, [router.query.query]);

  return (
    <>
      <NextSeo {...seoData} />
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
                      pageNum === 2 + pageListNum * 5 &&
                      `${styles.page_selected}`
                    }`}
                  >
                    {2 + pageListNum * 5}
                  </li>
                )}
                {(2 + pageListNum * 5) * 8 < searchResult.length && (
                  <li
                    className={`${
                      pageNum === 3 + pageListNum * 5 &&
                      `${styles.page_selected}`
                    }`}
                  >
                    {3 + pageListNum * 5}
                  </li>
                )}
                {(3 + pageListNum * 5) * 8 < searchResult.length && (
                  <li
                    className={`${
                      pageNum === 4 + pageListNum * 5 &&
                      `${styles.page_selected}`
                    }`}
                  >
                    {4 + pageListNum * 5}
                  </li>
                )}
                {(4 + pageListNum * 5) * 8 < searchResult.length && (
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

export default SearchPage;
