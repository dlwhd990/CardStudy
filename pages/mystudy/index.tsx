import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FolderCard from "../../components/FolderCard/FolderCard";
import Paging from "../../components/Paging/Paging";
import Folder from "../../model/folder";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadUserFolderList } from "../../store/userFolder";
import styles from "../../styles/mystudy.module.css";

const seoData = {
  title: "카드스터디 - 나의 공부",
  description: "내가 만든 카드 묶음들로 공부할 수 있습니다.",
  canonical: "https://card-study.vercel.app/mystudy",
};

const itemsPerPage = 8;

const MyStudy = () => {
  const [pageNum, setPageNum] = useState(1);
  const userFolderList = useAppSelector((state) => state.userFolder.list);
  const userData = useAppSelector((state) => state.userData);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUserFolderList());
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
    <>
      <NextSeo {...seoData} />
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
                .slice((pageNum - 1) * itemsPerPage, pageNum * itemsPerPage)
                .map((folder: Folder) => (
                  <li key={folder._id.toString()}>
                    <FolderCard folder={folder} count={folder.problemCount} />
                  </li>
                ))}
            </ul>
            <Paging
              listLength={userFolderList.length}
              route="mystudy"
              itemsPerPage={itemsPerPage}
            />
          </section>
        )}
      </main>
    </>
  );
};

export default MyStudy;
