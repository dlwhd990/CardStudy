import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import Like from "../../model/like";
import { useAppSelector } from "../../store/hooks";
import FolderCard from "../FolderCard/FolderCard";
import styles from "./LikePage.module.css";

const LikePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [pageListNum, setPageListNum] = useState(0);
  const userLikeList = useAppSelector((state) => state.userLike.list);
  const router = useRouter();

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
    if ((5 + pageListNum * 5) * 8 >= userLikeList.length) return;
    const nowPageListNum = pageListNum;
    setPageNum((nowPageListNum + 1) * 5 + 1);
    setPageListNum((state) => state + 1);
  };

  return (
    <div className={styles.like_page}>
      {userLikeList.length === 0 ? (
        <div className={styles.message_box}>
          <p className={styles.message}>
            아직 북마크 하신 카드 묶음이 없어요 😂
          </p>
          <button
            className={styles.message_button}
            onClick={() => router.push("/study")}
          >
            카드 묶음 보러가기
          </button>
        </div>
      ) : (
        <>
          <h2>북마크</h2>
          <p className={styles.description}>
            내가 북마크 한 카드 묶음을 모아서 볼 수 있어요
          </p>
          <section className={styles.folder_card_section}>
            <ul className={styles.card_list}>
              {userLikeList
                .slice((pageNum - 1) * 8, pageNum * 8)
                .map((like: Like) => (
                  <li key={like._id.toString()}>
                    <FolderCard item={like} count={-1} />
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
                {(1 + pageListNum * 5) * 8 < userLikeList.length && (
                  <li
                    className={`${
                      pageNum === 2 + pageListNum * 5 &&
                      `${styles.page_selected}`
                    }`}
                  >
                    {2 + pageListNum * 5}
                  </li>
                )}
                {(2 + pageListNum * 5) * 8 < userLikeList.length && (
                  <li
                    className={`${
                      pageNum === 3 + pageListNum * 5 &&
                      `${styles.page_selected}`
                    }`}
                  >
                    {3 + pageListNum * 5}
                  </li>
                )}
                {(3 + pageListNum * 5) * 8 < userLikeList.length && (
                  <li
                    className={`${
                      pageNum === 4 + pageListNum * 5 &&
                      `${styles.page_selected}`
                    }`}
                  >
                    {4 + pageListNum * 5}
                  </li>
                )}
                {(4 + pageListNum * 5) * 8 < userLikeList.length && (
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
        </>
      )}
    </div>
  );
};

export default LikePage;
