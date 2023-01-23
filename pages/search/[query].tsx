import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FolderCard from "../../components/FolderCard/FolderCard";
import Folder from "../../model/folder";
import styles from "../../styles/searchPage.module.css";
import { NextSeo } from "next-seo";
import axios from "axios";
import Paging from "../../components/Paging/Paging";

const itemsPerPage = 8;

const SearchPage = () => {
  const router = useRouter();
  const [searchResult, setSearchResult] = useState<Folder[]>([]);
  const [pageNum, setPageNum] = useState(1);

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
                .slice((pageNum - 1) * itemsPerPage, pageNum * itemsPerPage)
                .map((folder: Folder) => (
                  <li key={folder._id.toString()}>
                    <FolderCard folder={folder} count={folder.problemCount} />
                  </li>
                ))}
            </ul>
            <Paging
              listLength={searchResult.length}
              route={`search/${router.query.query}`}
              itemsPerPage={itemsPerPage}
            />
          </section>
        )}
      </main>
    </>
  );
};

export default SearchPage;
