import styles from "../styles/game/game.module.scss";
import Image from "next/image";
import Check from "../public/image/check.svg";
import Cancel from "../public/image/cancel.svg";
import { useEffect, useState } from "react";
import Header from "@/component/game/Header";
import Sidebar from "@/component/game/Sidebar";
import { SubjectProps } from "@/type/subjects";

const GamePage = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<SubjectProps>(null);

  const handleCopy = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const subjects = [
    {
      name: "문제 1",
      content: "어쩌구저쩌구 hello world를 출력해주세요.",
      level: 1,
      isSolved: true,
    },
    {
      name: "문제 2",
      content: "어떤 문자열을 입력받아 출력하세요.",
      level: 2,
      isSolved: false,
    },
    {
      name: "문제 3",
      content: "두 수의 합을 구하세요.",
      level: 3,
      isSolved: false,
    },
    {
      name: "문제 4",
      content: "배열의 최대값을 구하세요.",
      level: 4,
      isSolved: false,
    },
  ];

  const solvedCount = subjects.filter((subject) => subject.isSolved).length;
  const totalCount = subjects.length;
  const progress = `${solvedCount} / ${totalCount}`;

  useEffect(() => {
    setSelectedSubject(subjects[0]);
  }, []);

  const handleSubjectClick = (subject: SubjectProps) => {
    setSelectedSubject(subject);
    setInputValue(""); // 문제를 클릭할 때 입력값 초기화
  };
  const handlePrevious = () => {
    const currentIndex = subjects.findIndex(
      (subject) => subject.level === selectedSubject.level
    );
    if (currentIndex > 0) {
      setSelectedSubject(subjects[currentIndex - 1]);
    } else {
      alert("첫 번째 문제입니다.");
    }
  };

  const handleNext = () => {
    const currentIndex = subjects.findIndex(
      (subject) => subject.level === selectedSubject.level
    );
    if (currentIndex < totalCount - 1) {
      setSelectedSubject(subjects[currentIndex + 1]);
    } else {
      alert("마지막 문제입니다.");
    }
  };

  return (
    <div className={styles.layout}>
      <Header />

      <div className={styles.content}>
        <Sidebar
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSubjectClick={handleSubjectClick}
          progress={progress}
        />

        <div className={styles.main}>
          {selectedSubject && (
            <div className={styles.question}>
              <div className={styles.qTitle}>
                <p>{selectedSubject.name}</p>
                {selectedSubject.isSolved ? (
                  <Image src={Check} alt="Check" className={styles.check} />
                ) : (
                  <Image src={Cancel} alt="Cancel" className={styles.cancel} />
                )}
              </div>
              <div className={styles.qContent}>{selectedSubject.content}</div>
            </div>
          )}

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
                <p>djflkdjf</p> <p>djflkdjf</p>
                <p>djflkdjf</p>
                <p>djflkdjf</p>
                <p>djflkdjf</p>
              </div>
            </div>
          </div>

          <div className={styles.buttons}>
            <button
              className={`${styles.button} ${styles.violet}`}
              onClick={handlePrevious}
            >
              이전
            </button>
            <button
              className={`${styles.button} ${styles.violet}`}
              onClick={handleNext}
            >
              이후
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
