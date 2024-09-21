import styles from "../../styles/game/header.module.scss";

const Header = () => {
  const time = "24:00:00";

  return (
    <div className={styles.header}>
      <div className={styles.logo}>석봉아 코드를 쓰거라</div>
      <div className={styles.time}>
        <p>남은시간</p>
        <p>{time}</p>
      </div>
    </div>
  );
};

export default Header;
