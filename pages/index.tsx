import Head from "next/head";
import { useRouter } from "next/router";
import Card from "../components/Card/Card";
import IntroduceCardImageLeft from "../components/IntroduceCard/IntroduceCardImageLeft";
import IntroduceCardImageRight from "../components/IntroduceCard/IntroduceCardImageRight";
import Intro from "../model/intro";
import styles from "../styles/homepage.module.css";
import { introCardList } from "../util/introData";
function HomePage() {
  const introTopCard = {
    _id: {},
    question: "정답이 뭘까요❓\n카드를 클릭해보세요!",
    answer: "💡 뒤집으면 알 수 있어요!",
    like: 0,
    userId: "1",
    folderId: "1",
    date: 1672594865657,
  };

  const router = useRouter();

  const goStudy = () => {
    router.push("/study");
  };

  return (
    <>
      <Head>
        <link
          rel="preload"
          as="style"
          href="https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
        />
      </Head>
      <main className={styles.homepage}>
        <section className={styles.top_banner}>
          <div className={styles.top_banner_background}>
            <p className={styles.top_banner_subtitle}>직접 만드는 암기 카드</p>
            <h2 className={styles.top_banner_title}>
              카드스터디에서 공부하세요
            </h2>
            <button className={styles.top_banner_button} onClick={goStudy}>
              시작하기
            </button>
          </div>
        </section>
        <section className={styles.intro_section}>
          <h2 className={styles.intro_title}>🎉 카드스터디를 소개합니다 🎉</h2>
          <div className={styles.card_part}>
            <div className={styles.intro_card}>
              <Card item={introTopCard} />

              <article className={styles.intro_article}>
                <h3>카드를 활용한 공부 💡</h3>
                <p>
                  암기한 내용을 다시 확인하고 싶지만 문제와 답이 함께 적혀있어
                  불편했던 경험이 있으신가요? <br></br>
                  <br></br>카드스터디에서는 카드를 뒤집기 전에는 정답을 볼 수
                  없습니다! 왼쪽의 카드를 클릭해보세요☺️
                </p>
              </article>
            </div>
            {introCardList.map((intro: Intro, idx) => {
              if (idx % 2 == 0)
                return <IntroduceCardImageRight key={intro.id} intro={intro} />;
              else
                return <IntroduceCardImageLeft key={intro.id} intro={intro} />;
            })}
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;
