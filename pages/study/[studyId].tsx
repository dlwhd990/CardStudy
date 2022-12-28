import {
  faAngleLeft,
  faAngleRight,
  faComment,
  faFlag,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ObjectId } from "mongodb";
import { GetStaticPropsContext } from "next";
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Folder from "../../model/folder";
import Problem from "../../model/problem";
import { makeInactive } from "../../store/cardActive";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "../../styles/studyPage.module.css";
import { connectToDatabase } from "../../util/mongodb";

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
  const db = await connectToDatabase();
  const folderCollection = db.collection<Folder>("folder");
  const fullList = await folderCollection.find({}).toArray();
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
  const db = await connectToDatabase();
  const collection = db.collection<Folder>("folder");
  const folder = await collection.findOne({
    _id: new ObjectId(context?.params?.studyId as string),
  });
  // console.log("FOLDER", folder);

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
