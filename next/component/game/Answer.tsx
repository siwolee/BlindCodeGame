import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "../../styles/game/answer.module.scss";
import { BASE_URL } from "@/type/constant";

interface GameProps {
  handleCopy: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void;
  intraId: string;
  onSubmit: () => void;
  curLevel: number | undefined;
}

const Answer = ({ handleCopy, intraId, onSubmit, curLevel }: GameProps) => {
  const [result, setResult] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}subject?intraId=${intraId}`,
        {
          level: curLevel,
          code: inputValue,
        }
      );
      const data = response.data;
      switch (response.status) {
        case 201:
          if (data.errorOutput !== "") {
            alert("컴파일 에러가 발생했습니다.");
          } else if (data.userOutput !== data.correctOutput) {
            setResult(data.userOutput);
            alert("오답입니다.");
          } else {
            alert("정답입니다.");
            setResult(data.userOutput);
          }
          break;
        default:
          if (response.status === 409) {
            alert("이미 제출한 문제입니다.");
          }
          break;
      }
      onSubmit();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          alert("이미 제출한 문제입니다.");
        } else {
          alert("제출에 실패했습니다.");
        }
      } else {
        alert("제출에 실패했습니다.");
      }
    } finally {
      setInputValue("");
      if (textAreaRef.current) {
        textAreaRef.current.value = "";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key;

    if (
      key === "ArrowUp" ||
      key === "ArrowDown" ||
      key === "ArrowLeft" ||
      key === "ArrowRight"
    ) {
      e.preventDefault();
      alert("상하좌우 방향키 입력은 허용되지 않습니다.");
    }

    if (key === "Backspace") {
      e.preventDefault();
      setInputValue((prev) => {
        const newValue = prev.slice(0, -1);
        return newValue;
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value) {
      setInputValue((prev) => prev + value);
      e.target.value = "";
    }
  };

  useEffect(() => {
    const textArea = textAreaRef.current;

    if (textArea) {
      textArea.addEventListener("keydown", handleKeyDown);
      return () => {
        textArea.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  useEffect(() => {
    setInputValue("");
    if (textAreaRef.current) {
      textAreaRef.current.value = "";
    }
    setResult(null);
  }, [curLevel]);

  return (
    <div className={styles.game}>
      <div className={styles.boardWrapper}>
        <div className={styles.board}>
          <label className={styles.inputLabel}>
            {inputValue ? "입력중입니다..." : "여기에 입력하세요."}
          </label>
          <textarea
            ref={textAreaRef}
            className={styles.boardInput}
            onChange={handleInputChange}
            onCopy={handleCopy}
            onCut={handleCopy}
            onPaste={handleCopy}
          />
        </div>
        <button className={styles.button} onClick={handleSubmit}>
          제출
        </button>
      </div>

      <div className={styles.result}>
        <p>컴파일 결과</p>
        <div className={styles.resultBox}>
          {result ? <p>{result}</p> : <p>결과가 없습니다.</p>}
        </div>
      </div>
    </div>
  );
};

export default Answer;
