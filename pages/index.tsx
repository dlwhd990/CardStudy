import { useRouter } from "next/router";
import styles from "../styles/homepage.module.css";
function HomePage() {
  const router = useRouter();

  const goStudy = () => {
    router.push("/study");
  };

  return (
    <main className={styles.homepage}>
      <div className={styles.top_banner}>
        <div className={styles.top_banner_background}>
          <p className={styles.top_banner_subtitle}>직접 만드는 암기 카드</p>
          <h2 className={styles.top_banner_title}>CardStudy에서 공부하세요</h2>
          <button className={styles.top_banner_button} onClick={goStudy}>
            시작하기
          </button>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
