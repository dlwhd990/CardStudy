import React, { useEffect, useRef, useState } from "react";
import Intro from "../../model/intro";
import styles from "./IntroduceCard.module.css";

const IntroduceCardImageLeft: React.FC<{
  intro: Intro;
  direction: boolean;
  children: React.ReactNode;
}> = ({ intro, direction, children }) => {
  // direction => true = 왼쪽 이미지 / false = 오른쪽 이미지
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
      } ${direction ? `${styles.left}` : `${styles.right}`}`}
    >
      <article className={`${styles.intro_article}`}>
        <h3>{intro.title}</h3>
        <p>{intro.content}</p>
      </article>
      <div className={styles.children_container}>{children}</div>
    </div>
  );
};

export default IntroduceCardImageLeft;
