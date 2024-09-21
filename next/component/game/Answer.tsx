// Game.tsx
import styles from "../../styles/game/answer.module.scss";

interface GameProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleCopy: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

const Answer = ({ inputValue, setInputValue, handleCopy }: GameProps) => {
  return (
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
        <div className={styles.resultBox}>
          <p>djflkdjf</p>
          <p>djflkdjf</p>
          <p>djflkdjf</p>
          <p>djflkdjf</p>
          <p>djflkdjf</p>
          <p>djflkdjf</p>
        </div>
      </div>
    </div>
  );
};

export default Answer;
