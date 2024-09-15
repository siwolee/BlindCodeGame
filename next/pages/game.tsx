import styles from "../styles/game/game.module.scss";
import Image from "next/image";
import Check from "../public/image/check.svg";
import Cancel from "../public/image/cancel.svg";
import { useState } from "react";

const gamePage = () => {
  const [inputValue, setInputValue] = useState("");
  const time = "24:00:00";
  const progress = "1 / 6";
  const handleCopy = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div className={styles.logo}>석봉아 코드를 쓰거라</div>
        <div className={styles.time}>
          <p>남은시간</p>
          <p>{time}</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <div className={styles.indexs}>
            <div className={styles.index}>
              문제 1
              <Image src={Check} alt="Check" className={styles.image} />
            </div>
            <div className={styles.index}>
              문제 2
              <Image src={Cancel} alt="Cancel" className={styles.image} />
            </div>
            <div className={styles.index}>
              문제 3
              <Image src={Cancel} alt="Cancel" className={styles.image} />
            </div>
            <div className={styles.index}>
              문제 4
              <Image src={Cancel} alt="Cancel" className={styles.image} />
            </div>
          </div>

          <div className={styles.progress}>
            <p>진행률</p>
            <p>{progress}</p>
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.question}>
            <div className={styles.qTitle}>
              <p>문제 1</p>
              <Image src={Cancel} alt="Cancel" className={styles.image} />
            </div>
            <div className={styles.qContent}>
              어쩌구저쩌구 hello world를 출력해주세요.
            </div>
          </div>
          <div className={styles.game}>
            <div className={styles.boardWrapper}>
              <div className={styles.board}>
                <label className={styles.inputLabel}>
                  {inputValue ? "입력중입니다..." : "여기에 입력하세요."}
                </label>
                <input
                  type="text"
                  className={styles.boardInput}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onCopy={handleCopy}
                  onCut={handleCopy}
                  onPaste={handleCopy}
                />
              </div>
              <button className={styles.button}>제출</button>
            </div>
            <div className={styles.result}>
              <p>컴파일 결과</p>
              <div className={styles.resultBox}></div>
            </div>
          </div>

          <div className={styles.buttons}>
            <button className={`${styles.button} ${styles.violet}`}>
              이전
            </button>
            <button className={`${styles.button} ${styles.violet}`}>
              이후
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default gamePage;
