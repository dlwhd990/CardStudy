import { useEffect, useRef, useState } from "react";
import Intro from "../../model/intro";
import styles from "./IntroduceCard.module.css";

const IntroduceCardImageLeft: React.FC<{ intro: Intro }> = ({ intro }) => {
  const introRef = useRef<HTMLDivElement>(null);
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (introRef.current) {
      observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIntersecting(true);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.6 }
      );
      observer.observe(introRef.current as Element);
    }
    return () => observer && observer.disconnect();
  }, []);

  return (
    <div
      ref={introRef}
      className={`${styles.intro_card} ${
        intersecting ? `${styles.on}` : `${styles.off}`
      }`}
    >
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
