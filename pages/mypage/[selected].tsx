import { useState } from "react";
import ChangeName from "../../components/ChangeName/ChangeName";
import ProblemManage from "../../components/ProblemManage/ProblemManage";
import SideBar from "../../components/SideBar/SideBar";
import FolderUpload from "../../components/FolderUpload/FolderUpload";
import { useAppSelector } from "../../store/hooks";
import styles from "../../styles/mypage.module.css";
import ObjectionPage from "../../components/ObjectionPage/ObjectionPage";
import LikePage from "../../components/LikePage/LikePage";
import { useRouter } from "next/router";

const MyPage = () => {
  const userData = useAppSelector((state) => state.userData);
  const folderUploadOn = useAppSelector((state) => state.popup.folderUpload);
  const router = useRouter();
  const { selected } = router.query;
  const changeSelectedValue = (value: string) => {
    router.push(`/mypage/${value}`);
  };

  const showSelected = () => {
    if (userData.name.length === 0) return <p>로그인 후에 사용 가능합니다.</p>;
    else if (selected === "changeName") return <ChangeName />;
    else if (selected === "problem") return <ProblemManage />;
    else if (selected === "like") return <LikePage />;
    else if (selected === "alert") return <ObjectionPage />;
  };
  return (
    <main className={styles.mypage}>
      {folderUploadOn && <FolderUpload />}
      <SideBar changeSelectedValue={changeSelectedValue} />
      <section className={styles.function_section}>{showSelected()}</section>
    </main>
  );
};

export default MyPage;
