import Link from "next/link";
import { useAppDispatch } from "../../store/hooks";
import { closeUserBox } from "../../store/popup";
import styles from "./MyPageButton.module.css";

const MyPageButton = () => {
  const dispatch = useAppDispatch();

  return (
    <Link href="/mypage/problem" onClick={() => dispatch(closeUserBox())}>
      <button className={styles.mypage_button}>마이페이지</button>
    </Link>
  );
};

export default MyPageButton;
