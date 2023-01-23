import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Folder from "../../model/folder";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadUserLikeList } from "../../store/userLike";
import FolderCard from "../FolderCard/FolderCard";
import Paging from "../Paging/Paging";
import styles from "./LikePage.module.css";

const itemsPerPage = 8;

const LikePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const userLikeList = useAppSelector((state) => state.userLike.list);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUserLikeList());
  }, [dispatch]);

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
                .slice((pageNum - 1) * itemsPerPage, pageNum * itemsPerPage)
                .map((folder: Folder) => (
                  <li key={folder._id.toString()}>
                    <FolderCard folder={folder} count={folder.problemCount} />
                  </li>
                ))}
            </ul>
            <Paging
              listLength={userLikeList.length}
              route="mypage/like"
              itemsPerPage={itemsPerPage}
            />
          </section>
        </>
      )}
    </div>
  );
};

export default LikePage;
