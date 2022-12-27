import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAppSelector } from "../../store/hooks";
import LogoutButton from "../LogoutButton/LogoutButton";
import MyPageButton from "../MyPageButton/MyPageButton";
import styles from "./UserBox.module.css";

const UserBox = () => {
  const userData = useAppSelector((state) => state.userData);
  // 로그인
  const loginHandler = async (data: { credential: string }) => {
    await axios.post(
      "/api/login",
      {},
      {
        headers: {
          authorization: data.credential,
        },
      }
    );
    window.location.reload();
  };

  return (
    <div className={styles.user_box}>
      <div className={styles.user_data}>
        <img
          loading="lazy"
          src={
            userData.picture ||
            "https://preview.redd.it/0gfxom5gjlr41.jpg?auto=webp&s=aeb12132cabe51ef0953e5f5d23e8295d6694706"
          }
          alt="프로필사진"
          className={styles.user_image}
        />
        {userData.name.length > 0 ? (
          <p className={styles.user_name}>{`${userData.name} 님`}</p>
        ) : (
          <p className={styles.user_name}>로그인</p>
        )}
      </div>
      <div className={styles.login_button_container}>
        {userData.name.length > 0 && userData.picture.length > 0 ? (
          <div className={styles.button_container}>
            <MyPageButton />
            <LogoutButton />
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(credentialResponse: any) => {
              loginHandler(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UserBox;
