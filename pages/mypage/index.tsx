import { useState } from "react";
import ChangeName from "../../components/ChangeName/ChangeName";
import ProblemManage from "../../components/ProblemManage/ProblemManage";
import SideBar from "../../components/SideBar/SideBar";
import styles from "../../styles/mypage.module.css";

const MyPage = () => {
  const [selected, setSelected] = useState("changeName");
  const changeSelectedValue = (value: string) => {
    setSelected(value);
  };

  const showSelected = () => {
    if (selected === "changeName") return <ChangeName />;
    else if (selected === "problem") return <ProblemManage />;
  };
  return (
    <main className={styles.mypage}>
      <SideBar changeSelectedValue={changeSelectedValue} />
      <section className={styles.function_section}>{showSelected()}</section>
    </main>
  );
};

export default MyPage;
