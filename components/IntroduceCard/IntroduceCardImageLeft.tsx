import Intro from "../../model/intro";
import styles from "./IntroduceCard.module.css";

const IntroduceCardImageLeft: React.FC<{ intro: Intro }> = ({ intro }) => {
  return (
    <div className={styles.intro_card}>
      <div className={styles.image_container}>
        <img src="/images/home_1.png" alt="소개이미지" />
      </div>
      <article className={styles.intro_article}>
        <h3>{intro.title}</h3>
        <p>{intro.content}</p>
      </article>
    </div>
  );
};

export default IntroduceCardImageLeft;
