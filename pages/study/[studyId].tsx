import {
  faAngleLeft,
  faAngleRight,
  faComment,
  faFlag,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { GetStaticPropsContext } from "next";
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Folder from "../../model/folder";
import Problem from "../../model/problem";
import { makeInactive } from "../../store/cardActive";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "../../styles/studyPage.module.css";

const Study: React.FC<{ problemList: Problem[]; folder: Folder }> = ({
  problemList,
  folder,
}) => {
  const dispatch = useAppDispatch();
  const active = useAppSelector((state) => state.cardActive.active);
  const [now, setNow] = useState(0);

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

  useEffect(() => {
    dispatch(makeInactive());
    return () => {
      dispatch(makeInactive());
    };
  }, [dispatch]);

  return (
    <main className={styles.study}>
      <section className={styles.card_section}>
        <p className={styles.problem_number_count}>{`${now + 1}/${
          problemList.length
        }`}</p>
        <h2 className={styles.study_title}>{folder.title}</h2>
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
        </div>
      </section>
      <section className={styles.button_container}>
        <button className={styles.study_button}>
          <FontAwesomeIcon icon={faHeart} className={styles.heart} />
          <p className={styles.button_name}>좋아요</p>
        </button>
        <button className={styles.study_button}>
          <FontAwesomeIcon icon={faComment} className={styles.comment} />
          <p className={styles.button_name}>이의제기</p>
        </button>
        <button className={styles.study_button}>
          <FontAwesomeIcon icon={faFlag} className={styles.report} />
          <p className={styles.button_name}>신고</p>
        </button>
      </section>
    </main>
  );
};

export async function getStaticPaths() {
  const response = await axios.get("http://localhost:3000/api/folder/idlist");
  const fullList = response.data.result;
  const idList = fullList.map((folder: Folder) => folder._id.toString());
  const paths = idList.map((id: string) => {
    return {
      params: {
        studyId: id,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const folderResponse = await axios.get(
    `http://localhost:3000/api/folder/${context?.params?.studyId}`
  );
  const response = await axios.get(
    `http://localhost:3000/api/problemlist/${context?.params?.studyId}`
  );

  return {
    props: {
      problemList: response.data.result,
      folder: folderResponse.data.result,
    },
  };
}

export default Study;
