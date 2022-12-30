import { useEffect } from "react";
import { closeAlert } from "../../store/alert";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "./AlertBox.module.css";

const AlertBox = () => {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.alert.message);

  useEffect(() => {
    setTimeout(() => {
      dispatch(closeAlert());
    }, 1000);
  }, [dispatch]);

  return (
    <div className={styles.alert_box}>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default AlertBox;
