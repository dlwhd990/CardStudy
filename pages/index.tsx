import { useRouter } from "next/router";
import Card from "../components/Card/Card";
import IntroduceCardImageLeft from "../components/IntroduceCard/IntroduceCardImageLeft";
import IntroduceCardImageRight from "../components/IntroduceCard/IntroduceCardImageRight";
import Intro from "../model/intro";
import styles from "../styles/homepage.module.css";
function HomePage() {
  const dummy = {
    _id: {},
    question: "정답이 뭘까요❓",
    answer: "💡 뒤집으면 알 수 있어요!",
    like: 0,
    userId: "1",
    folderId: "1",
    date: 1672594865657,
  };

  const introCardList = [
    {
      title: "내가 직접 카드 묶음을 만들어요",
      content:
        "영단어 암기, 시험 대비 등 내가 원하는 모든 분야의 카드 묶음(문제집)을 자유롭게 만들 수 있어요!\n\n지금 바로 카드 묶음을 만들어보세요👍",
      image: "/images/home_1.png",
    },
    {
      title: "다른 사람의 카드 묶음으로 공부해요",
      content:
        "다른 사람이 만든 카드 묶음으로 공부할 수 있어요!\n\n 친구끼리 링크를 공유하거나, 🔎검색을 통해서 원하는 카드 묶음을 찾을 수도 있어요☺️\n\n만약 혼자 카드 묶음을 만드는 것이 부담스럽다면... 여러명이서 분담하면 더 효율적으로 공부할 수 있습니다",
      image: "/images/home_1.png",
    },
    {
      title: "북마크 모아보기",
      content:
        "나중에 다시 공부하고 싶은, 놓치고 싶지 않은 카드 묶음은 📒북마크 해두면 빠르게 다시 찾을 수 있어요!\n\n북마크는 클릭 단 한 번으로 등록/삭제가 가능합니다!",
      image: "/images/home_1.png",
    },
    {
      title: "틀린 내용은 바로잡기",
      content:
        "다른 사람의 카드 묶음으로 공부하다가 틀린 내용을 발견했다면...\n\n이의 제기📢 기능으로 제작자에게 이 사실을 알릴 수 있어요!\n(제작자에게는 알림이 가게 됩니다!)\n\nCardStudy는 문제/정답 수정이 가능하기 때문에, 제작자는 피드백을 손쉽게 반영할 수 있어요",
      image: "/images/home_1.png",
    },
    {
      title: "스마트폰에서도 완벽하게",
      content:
        "스마트폰에서도 CardStudy를 사용할 수 있어요!\n\n지하철, 시험장 등 어디서나 카드 묶음으로 공부해보세요",
      image: "/images/home_1.png",
    },
  ];

  const router = useRouter();

  const goStudy = () => {
    router.push("/study");
  };

  return (
    <main className={styles.homepage}>
      <section className={styles.top_banner}>
        <div className={styles.top_banner_background}>
          <p className={styles.top_banner_subtitle}>직접 만드는 암기 카드</p>
          <h2 className={styles.top_banner_title}>CardStudy에서 공부하세요</h2>
          <button className={styles.top_banner_button} onClick={goStudy}>
            시작하기
          </button>
        </div>
      </section>
      <section className={styles.intro_section}>
        <h2 className={styles.intro_title}>🎉 CardStudy를 소개합니다 🎉</h2>
        <div className={styles.card_part}>
          <div className={styles.intro_card}>
            <div className={styles.image_container}>
              <Card item={dummy} />
            </div>
            <article className={styles.intro_article}>
              <h3>카드를 활용한 공부 💡</h3>
              <p>
                암기한 내용을 다시 확인하고 싶지만 문제와 답이 함께 적혀있어
                불편했던 경험이 있으신가요? <br></br>
                <br></br>Card Study에서는 카드를 뒤집기 전에는 정답을 볼 수
                없습니다! 왼쪽의 카드를 클릭해보세요☺️
              </p>
            </article>
          </div>
          {introCardList.map((intro: Intro, idx) => {
            if (idx % 2 == 0) return <IntroduceCardImageRight intro={intro} />;
            else return <IntroduceCardImageLeft intro={intro} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
