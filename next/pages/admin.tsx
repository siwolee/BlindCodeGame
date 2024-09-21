import styles from "../styles/admin/admin.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BASE_URL } from "@/type/constant";
import axios from "axios";

type Subject = {
  name: string;
  content: string;
  level: number;
  solved: boolean;
};

type ListItem = {
  intraId: string;
  grade: number;
  subjects: Subject[];
};

interface AdminProps {
  isAllowed: boolean;
  setIsAllowed: (value: boolean) => void;
}

export default function AdminPage({ isAllowed, setIsAllowed }: AdminProps) {
  const router = useRouter();

  const [level, setLevel] = useState("");
  const [subjectTitle, setSubjectTitle] = useState("");
  const [subjectContent, setSubjectContent] = useState("");
  const [testCase, setTestCase] = useState("");
  const [correctOutput, setCorrectOutput] = useState("");
  const [listData, setListData] = useState<ListItem[] | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null); // 토글 상태를 관리

  // 페이지 접근 권한 체크
  useEffect(() => {
    if (!isAllowed) {
      router.push("/");
    } else {
      // 한번 접근을 허용한 후 다시 false로 설정
      setIsAllowed(false);
    }
  }, [router]);

  const handleStart = async () => {
    try {
      const response = await axios.post(`${BASE_URL}admin/competition`);
      if (response.status === 201) alert("대회가 시작되었습니다.");
    } catch (error) {
      alert("Error");
      console.error("Error fetching subjects:", error);
    }
  };

  const handleFinish = async () => {
    try {
      const response = await axios.patch(`${BASE_URL}admin/competition`);
      if (response.status === 204) alert("대회가 종료되었습니다.");
    } catch (error) {
      alert("Error");
      console.error("Error fetching subjects:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      // 문제 데이터 보내기 추가
      const response = await axios.post(`${BASE_URL}admin/subject`, {
        name: subjectTitle,
        content: subjectContent,
        level: level,
        testCase: testCase,
        correctOutput: correctOutput,
      });
      if (response.status === 201) {
        alert("문제가 정상적으로 등록되었습니다.");
        setSubjectTitle("");
        setSubjectContent("");
        setLevel("");
        setTestCase("");
        setCorrectOutput("");
      }
    } catch (error) {
      alert("Error");
      console.error("Error fetching subjects:", error);
    }
  };

  const handleResultList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}admin/result/list`);
      if (response.status === 200) {
        setListData(response.data);
        alert("결과 리스트 불러오기 성공");
      }
    } catch (error) {
      alert("Error");
      console.error("Error fetching subjects:", error);
    }
  };

  const toggleDetail = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div className={styles.logo}>Admin Page</div>
        <div className={styles.btnContainer}>
          <button className={styles.adminBtn} onClick={handleStart}>
            대회 시작
          </button>
          <button className={styles.adminBtn} onClick={handleFinish}>
            대회 종료
          </button>
        </div>
      </div>

      <div className={styles.adminContainer}>
        <div className={styles.subjectContainer}>
          <div className={styles.containerTitle}>문제 등록</div>
          <div className={styles.inputWrapper}>
            <div className={styles.title}>문제 레벨 (Number-고유키)</div>
            <input
              type="text"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className={styles.textColor}
            />
          </div>

          <div className={styles.inputWrapper}>
            <div className={styles.title}>문제 이름</div>
            <input
              type="text"
              value={subjectTitle}
              onChange={(e) => setSubjectTitle(e.target.value)}
              className={styles.textColor}
            />
          </div>

          <div className={styles.inputWrapper}>
            <div className={styles.title}>문제 설명</div>
            <textarea
              className={styles.textAreaBox}
              rows={5}
              value={subjectContent}
              onChange={(e) => setSubjectContent(e.target.value)}
            />
          </div>

          <div className={styles.inputWrapper}>
            <div className={styles.title}>테스트 케이스</div>
            <textarea
              className={styles.textAreaBox}
              rows={5}
              value={testCase}
              onChange={(e) => setTestCase(e.target.value)}
            />
          </div>

          <div className={styles.inputWrapper}>
            <div className={styles.title}>정상 출력</div>
            <textarea
              className={styles.textAreaBox}
              rows={5}
              value={correctOutput}
              onChange={(e) => setCorrectOutput(e.target.value)}
            />
          </div>

          <div className={styles.btnContainer}>
            <button className={styles.adminBtn} onClick={handleSubmit}>
              문제 등록하기
            </button>
          </div>
        </div>

        <div className={styles.subjectContainer}>
          <div className={styles.containerTitle}>대회 결과</div>

          <div className={styles.btnContainer}>
            <button className={styles.adminBtn} onClick={handleResultList}>
              결과 조회하기
            </button>
            {listData
              ? listData.map((item, index) => (
                  <div
                    key={index}
                    className={styles.listWrapper}
                    onClick={() => toggleDetail(index)}
                  >
                    <div className={styles.listSummary}>
                      <p>{item.intraId}</p>
                      <p className={styles.grade}>{item.grade}점</p>
                    </div>
                    {expandedIndex === index && (
                      <div className={styles.listDetail}>
                        {item.subjects.map((sub, id) => (
                          <div
                            key={`${index}_${id}`}
                            className={styles.listDetail}
                          >
                            {sub.solved ? <p>✅</p> : <p>❌</p>}
                            <p> | </p>
                            <p>level: {sub.level}</p>
                            <p> | </p>
                            <p>{sub.name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
