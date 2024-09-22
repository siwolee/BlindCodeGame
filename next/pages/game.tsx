import styles from "../styles/game/game.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/component/game/Header";
import Sidebar from "@/component/game/Sidebar";
import { SubjectProps } from "@/type/subjects";
import Question from "@/component/game/Question";
import Answer from "@/component/game/Answer";
import { BASE_URL } from "@/type/constant";
import { useRouter } from "next/router";

const GamePage = () => {
  const router = useRouter();
  const { intraId } = router.query as { intraId: string };

  const [selectedSubject, setSelectedSubject] = useState<SubjectProps>();
  const [subjects, setSubjects] = useState<SubjectProps[]>([]);
  const [time, setTime] = useState<string>("");
  const [progress, setProgress] = useState<string>("");

  const handleCopy = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}subject/list?intraId=${intraId}`
      );
      setSubjects(response.data);

      if (response.data.length > 0) {
        const updatedSelectedSubject = response.data.find(
          (subject: SubjectProps) => subject.level === selectedSubject?.level
        );
        setSelectedSubject(updatedSelectedSubject || response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    const solvedCount = subjects.filter((subject) => subject.solved).length;
    const totalCount = subjects.length;
    setProgress(`${solvedCount} / ${totalCount}`);
  }, [subjects]);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await axios.get(`${BASE_URL}game?intraId=${intraId}`);
        setTime(response.data.time);
      } catch (error) {
        console.error("Error fetching time:", error);
      }
    };

    fetchSubjects();
    fetchTime();
  }, [intraId]);

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
    const totalCount = subjects.length;
    if (currentIndex < totalCount - 1) {
      setSelectedSubject(subjects[currentIndex + 1]);
    } else {
      alert("마지막 문제입니다.");
    }
  };

  return (
    <div className={styles.layout}>
      <Header time={time} intraId={intraId} />

      <div className={styles.content}>
        <Sidebar
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSubjectClick={setSelectedSubject}
          progress={progress}
        />

        <div className={styles.main}>
          {selectedSubject && <Question selectedSubject={selectedSubject} />}
          <Answer
            handleCopy={handleCopy}
            intraId={intraId}
            onSubmit={fetchSubjects}
            curLevel={selectedSubject?.level}
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
