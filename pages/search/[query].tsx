import { useRouter } from "next/router";
import styles from "../../styles/searchPage.module.css";

const SearchPage = () => {
  const router = useRouter();
  return (
    <main className={styles.search_page}>
      <p>{`${router.query.query} 검색 결과`}</p>
    </main>
  );
};

export default SearchPage;
