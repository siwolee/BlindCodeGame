import styles from "../styles/game/game.module.scss";
import { useEffect, useState } from "react";
import axios from "axios"; // axios 임포트
import Header from "@/component/game/Header";
import Sidebar from "@/component/game/Sidebar";
import { SubjectProps } from "@/type/subjects";
import Question from "@/component/game/Question";
import Answer from "@/component/game/Answer";

const GamePage = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<SubjectProps>();
  const [subjects, setSubjects] = useState<SubjectProps[]>([]); // subjects 상태 추가

  const handleCopy = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  // const subjects = [
  //   {
  //     name: "문제 1",
  //     content: "어쩌구저쩌구 hello world를 출력해주세요.",
  //     level: 1,
  //     isSolved: true,
  //   },
  //   {
  //     name: "문제 2",
  //     content: "어떤 문자열을 입력받아 출력하세요.",
  //     level: 2,
  //     isSolved: false,
  //   },
  //   {
  //     name: "문제 3",
  //     content: "두 수의 합을 구하세요.",
  //     level: 3,
  //     isSolved: false,
  //   },
  //   {
  //     name: "문제 4",
  //     content: "배열의 최대값을 구하세요.",
  //     level: 4,
  //     isSolved: false,
  //   },
  // ];

  const solvedCount = subjects.filter((subject) => subject.isSolved).length;
  const totalCount = subjects.length;
  const progress = `${solvedCount} / ${totalCount}`;

  useEffect(() => {
    // 컴포넌트가 마운트될 때 API 호출
    const fetchSubjects = async () => {
      try {
        const intraId = "your_intra_id"; // 실제 intraId로 변경
        const response = await axios.get(
          `http://localhost:8080/blind/subject/list?intraId=${intraId}`
        );
        setSubjects(response.data); // 받아온 데이터로 subjects 상태 업데이트
        setSelectedSubject(response.data[0]); // 첫 번째 문제 선택
      } catch (error) {
        console.error("Error fetching subjects:", error);
        alert("문제를 불러오는 데 실패했습니다.");
      }
    };

    fetchSubjects();
  }, []);

  const handleSubjectClick = (subject: SubjectProps) => {
    setSelectedSubject(subject);
    setInputValue(""); // 문제를 클릭할 때 입력값 초기화
  };

  const handlePrevious = () => {
    if (!selectedSubject) {
      alert("문제를 선택해 주세요.");
      return;
    }
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
    if (!selectedSubject) {
      alert("문제를 선택해 주세요.");
      return;
    }

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
          {selectedSubject && <Question selectedSubject={selectedSubject} />}
          <Answer
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleCopy={handleCopy}
          />
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
