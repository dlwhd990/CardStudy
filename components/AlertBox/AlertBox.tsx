import { useEffect } from "react";
import { closeAlert } from "../../store/alert";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "./AlertBox.module.css";

const AlertBox = () => {
  const dispatch = useAppDispatch();
  const alertShow = useAppSelector((state) => state.alert.show);
  const message = useAppSelector((state) => state.alert.message);

  useEffect(() => {
    if (!alertShow) return;
    setTimeout(() => {
      dispatch(closeAlert());
    }, 1000);
  }, [dispatch, alertShow]);

  return (
    <div
      className={`${styles.alert_box} ${
        alertShow ? `${styles.on}` : `${styles.off}`
      }`}
    >
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default AlertBox;
