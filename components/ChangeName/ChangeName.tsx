import styles from "./ChangeName.module.css";

const ChangeName = () => {
  return (
    <div className={styles.form_container}>
      <form className={styles.change_name_form}>
        <label htmlFor="name">변경할 닉네임</label>
        <div className={styles.input_and_button}>
          <input type="text" id="name" placeholder="닉네임 (3~6자)" />
          <button>변경</button>
        </div>
      </form>
    </div>
  );
};

export default ChangeName;
