import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FolderCard from "../../components/FolderCard/FolderCard";
import Folder from "../../model/folder";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadUserFolderList } from "../../store/userFolder";
import styles from "../../styles/mystudy.module.css";

const MyStudy = () => {
  const [pageNum, setPageNum] = useState(1);
  const [pageListNum, setPageListNum] = useState(0);
  const userFolderList = useAppSelector((state) => state.userFolder.list);
  const userData = useAppSelector((state) => state.userData);
  const router = useRouter();
  const dispatch = useAppDispatch();

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
    if ((5 + pageListNum * 5) * 8 >= userFolderList.length) return;
    const nowPageListNum = pageListNum;
    setPageNum((nowPageListNum + 1) * 5 + 1);
    setPageListNum((state) => state + 1);
  };

  useEffect(() => {
    dispatch(loadUserFolderList());
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <h2>나의 공부</h2>
      <p className={styles.description}>내가 만든 카드 묶음으로 공부해요</p>
      {userData.name.length === 0 ? (
        <div className={styles.message_box}>
          <p className={styles.message}>🔒 로그인 후에 사용해주세요</p>
          <button
            className={styles.message_button}
            onClick={() => router.back()}
          >
            뒤로 가기
          </button>
        </div>
      ) : userFolderList.length === 0 ? (
        <div className={styles.message_box}>
          <p className={styles.message}>아직 카드 묶음이 없어요 😂</p>
          <button
            className={styles.message_button}
            onClick={() => router.push("/mypage/problem")}
          >
            카드 묶음 만들기
          </button>
        </div>
      ) : (
        <section className={styles.folder_card_section}>
          <ul className={styles.card_list}>
            {userFolderList
              .slice((pageNum - 1) * 8, pageNum * 8)
              .map((folder: Folder) => (
                <li key={folder._id.toString()}>
                  <FolderCard item={folder} count={folder.problemCount} />
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
              {(1 + pageListNum * 5) * 8 < userFolderList.length && (
                <li
                  className={`${
                    pageNum === 2 + pageListNum * 5 && `${styles.page_selected}`
                  }`}
                >
                  {2 + pageListNum * 5}
                </li>
              )}
              {(2 + pageListNum * 5) * 8 < userFolderList.length && (
                <li
                  className={`${
                    pageNum === 3 + pageListNum * 5 && `${styles.page_selected}`
                  }`}
                >
                  {3 + pageListNum * 5}
                </li>
              )}
              {(3 + pageListNum * 5) * 8 < userFolderList.length && (
                <li
                  className={`${
                    pageNum === 4 + pageListNum * 5 && `${styles.page_selected}`
                  }`}
                >
                  {4 + pageListNum * 5}
                </li>
              )}
              {(4 + pageListNum * 5) * 8 < userFolderList.length && (
                <li
                  className={`${
                    pageNum === 5 + pageListNum * 5 && `${styles.page_selected}`
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
  );
};

export default MyStudy;
