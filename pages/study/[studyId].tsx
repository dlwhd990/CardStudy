import {
  faAngleLeft,
  faAngleRight,
  faComment,
  faFlag,
  // faHeart as fullHeart,
  faStar as fullStar,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ObjectId } from "mongodb";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import ObjectionPopup from "../../components/ObjectionPopup/ObjectionPopup";
import Folder from "../../model/folder";
import Problem from "../../model/problem";
import { makeInactive } from "../../store/cardActive";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { openObjection, openReport } from "../../store/popup";
import styles from "../../styles/studyPage.module.css";
import { connectToDatabase } from "../../util/mongodb";
import axios from "axios";
import { showAlert } from "../../store/alert";
import ReportPopup from "../../components/ReportPopup/ReportPopup";
import { NextSeo } from "next-seo";

const Study: React.FC<{ problemList: Problem[]; folder: Folder }> = ({
  problemList,
  folder,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [liked, setLiked] = useState(false);
  const [now, setNow] = useState(0);
  const objectionOn = useAppSelector((state) => state.popup.objection);
  const reportOn = useAppSelector((state) => state.popup.report);
  const userName = useAppSelector((state) => state.userData.name);

  const changeNow = (query: boolean) => {
    if (query && now > 0) {
      setNow((state) => state - 1);
    } else if (!query && now < problemList.length - 1) {
      setNow((state) => state + 1);
    }
  };

  const arrowClickHandler = (direction: boolean) => {
    dispatch(makeInactive());
    setTimeout(() => {
      changeNow(direction);
    }, 200);
  };

  const openObjectionPopup = () => {
    if (userName.length === 0) {
      dispatch(showAlert("로그인 후에 사용 가능합니다!"));
      return;
    }
    dispatch(openObjection());
  };

  const openReportPopup = () => {
    if (userName.length === 0) {
      dispatch(showAlert("로그인 후에 사용 가능합니다!"));
      return;
    }
    dispatch(openReport());
  };

  const onLikeHandler = async () => {
    if (userName.length === 0) {
      dispatch(showAlert("로그인 후에 사용 가능합니다!"));
      return;
    }

    if (liked) {
      const response = await axios.delete(`/api/like/${router.query.studyId}`);
      if (response.data.success) {
        setLiked(false);
        dispatch(showAlert("북마크 취소 되었습니다!"));
      } else {
        dispatch(showAlert("로그인 후에 사용 가능합니다!"));
      }
    } else {
      const response = await axios.post("/api/like", {
        folderId: folder._id,
      });
      if (response.data.success) {
        setLiked(true);
        dispatch(showAlert("북마크 하셨습니다!"));
      } else {
        dispatch(showAlert("로그인 후에 사용 가능합니다!"));
      }
    }
  };

  const likeIconSelector = () => {
    // if (liked) return fullHeart;
    // return faHeart;
    if (liked) return fullStar;
    return faStar;
  };

  useEffect(() => {
    const checkLiked = async () => {
      const response = await axios.get(`/api/like/${router.query.studyId}`);

      if (response.data.success && response.data.isLiked) {
        setLiked(true);
      }
    };
    checkLiked();
  }, [router.query.studyId]);

  useEffect(() => {
    dispatch(makeInactive());
    return () => {
      dispatch(makeInactive());
    };
  }, [dispatch]);

  const seoData = {
    title: `카드 스터디 - ${folder.title}`,
    description: `카드 스터디 - ${folder.title}`,
    canonical: "https://card-study.vercel.app/search",
  };

  return (
    <>
      <NextSeo {...seoData} />
      <main className={styles.study}>
        {objectionOn && <ObjectionPopup folder={folder} />}
        {reportOn && <ReportPopup folder={folder} />}
        {problemList && problemList.length > 0 ? (
          <Fragment>
            <section className={styles.card_section}>
              <p className={styles.problem_number_count}>{`${now + 1}/${
                problemList.length
              }`}</p>
              <h2 className={styles.study_title}>{`[${folder.title}]`}</h2>
              <p className={styles.author}>{`by ${folder.userName} 님`}</p>
              <div className={styles.problem_container}>
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className={styles.arrow_left}
                  onClick={() => arrowClickHandler(true)}
                />
                <Card item={problemList[now]} />
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className={styles.arrow_right}
                  onClick={() => arrowClickHandler(false)}
                />
                <div className={styles.mobile_arrow_container}>
                  <button
                    className={styles.mobile_arrow_left}
                    onClick={() => arrowClickHandler(true)}
                  >
                    이전
                  </button>
                  <button
                    className={styles.mobile_arrow_right}
                    onClick={() => arrowClickHandler(false)}
                  >
                    다음
                  </button>
                </div>
              </div>
            </section>
            <section className={styles.button_container}>
              <button className={styles.study_button} onClick={onLikeHandler}>
                <FontAwesomeIcon
                  icon={likeIconSelector()}
                  className={styles.heart}
                />
                <p className={styles.button_name}>북마크</p>
              </button>
              <button
                className={styles.study_button}
                onClick={openObjectionPopup}
              >
                <FontAwesomeIcon icon={faComment} className={styles.comment} />
                <p className={styles.button_name}>이의제기</p>
              </button>
              <button className={styles.study_button} onClick={openReportPopup}>
                <FontAwesomeIcon icon={faFlag} className={styles.report} />
                <p className={styles.button_name}>신고</p>
              </button>
            </section>
          </Fragment>
        ) : (
          <p>잘못된 접근입니다.</p>
        )}
      </main>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const db = await connectToDatabase();
  const collection = db.collection<Folder>("folder");
  const folder = await collection.findOne({
    _id: new ObjectId(context?.params?.studyId as string),
  });

  const problemCollection = db.collection<Problem>("problem");
  const problemList = await problemCollection
    .find({ folderId: context?.params?.studyId })
    .toArray();

  // https://imgyuzzzang.tistory.com/13
  // https://stackoverflow.com/questions/52453407/the-difference-between-object-and-plain-object-in-javascript
  return {
    props: {
      problemList: JSON.parse(JSON.stringify(problemList)),
      folder: JSON.parse(JSON.stringify(folder)),
    },
  };
}

export default Study;
