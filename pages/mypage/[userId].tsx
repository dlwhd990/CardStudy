import ChangeName from "../../components/ChangeName/ChangeName";
import ProblemManage from "../../components/ProblemManage/ProblemManage";
import SideBar from "../../components/SideBar/SideBar";
import styles from "../../styles/mypage.module.css";

const MyPage = () => {
  return (
    <main className={styles.mypage}>
      <SideBar />
      <section className={styles.function_section}>
        {/* <ChangeName /> */}
        <ProblemManage />
      </section>
    </main>
  );
};

export default MyPage;
