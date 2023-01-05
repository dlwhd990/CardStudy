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
      <div className={styles.user_box_top}>
        {userData.name.length > 0 ? "계정" : "로그인"}
      </div>
      {userData.name && (
        <div className={styles.user_data}>
          <img
            loading="lazy"
            src={userData.picture || "/images/profile_default.jpeg"}
            alt="프로필사진"
            className={styles.user_image}
          />
          <div className={styles.name_and_welcome}>
            <p className={styles.welcome}>안녕하세요</p>
            <p className={styles.user_name}>{`${userData.name} 님`}</p>
          </div>
        </div>
      )}
      <div className={styles.login_button_container}>
        {userData.name.length > 0 && userData.picture.length > 0 ? (
          <div className={styles.button_container}>
            <MyPageButton />
            <LogoutButton />
          </div>
        ) : (
          <div className={styles.login_container}>
            <GoogleLogin
              onSuccess={(credentialResponse: any) => {
                loginHandler(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBox;
