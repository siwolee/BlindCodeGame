import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/game/header.module.scss";
import { useRouter } from "next/router";
import { BASE_URL } from "@/type/constant";

interface HeaderProps {
  time: string; // 시작 시간
  intraId: string;
}

const Header = ({ time, intraId }: HeaderProps) => {
  const router = useRouter();
  const limit = 30 * 60; // 제한 시간 30분
  const [remainingTime, setRemainingTime] = useState(limit);

  useEffect(() => {
    if (!time || time === "") {
      setRemainingTime(0);
      return;
    }

    const startTime = new Date(
      new Date(time).getTime() + 9 * 60 * 60 * 1000
    ).getTime();
    const deadline = startTime + limit * 1000;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = Math.max(0, deadline - now);
      setRemainingTime(Math.floor(timeLeft / 1000));

      if (timeLeft <= 0) {
        clearInterval(timer);
        handleFinish();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time, limit]);

  const formatTime = (seconds: number) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  const handleFinish = async () => {
    try {
      const response = await axios.patch(
        `${BASE_URL}subject?intraId=${intraId}`,
        {}
      );
      if (response.status === 204) {
        alert("종료되었습니다.");
        router.push("/");
      } else {
        alert("오류가 발생했습니다.");
      }
    } catch (error) {
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>석봉아 코드를 쓰거라</div>
      <div className={styles.buttons}>
        <div className={styles.time}>
          <p>남은시간</p>
          <p>{formatTime(remainingTime)}</p>
        </div>
        <button className={styles.finish} onClick={handleFinish}>
          종료
        </button>
      </div>
    </div>
  );
};

export default Header;
