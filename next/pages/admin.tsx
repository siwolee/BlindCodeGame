import styles from "../styles/admin/admin.module.scss";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type Subject = {
  name: string;
  content: string;
  level: number;
  isSolved: boolean;
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

  const [level, setLevel] = useState('');
  const [subjectTitle, setSubjectTitle] = useState('');
  const [subjectContent, setSubjectContent] = useState('');
  const [testCase, setTestCase] = useState('');
  const [correctOutput, setCorrectOutput] = useState('');
  const [listData, setListData] = useState<ListItem[] | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null); // 토글 상태를 관리
  
   // 페이지 접근 권한 체크
   useEffect(() => {
    if (!isAllowed) {
      router.push('/');
    } else {
      // 한번 접근을 허용한 후 다시 false로 설정
      setIsAllowed(false);
    }
  }, [router]);

  // const listData: ListItem[] = [
  //     {
  //       intraId: 'jeongrol',
  //       grade: 5,
  //       subjects: [
  //       {
  //         name: '테스트입니다 테스트입니다 테스트입니다 테스트입니다 테스트입니다 테스트입니다 테스트입니다 테스트입니다 테스트입니다 테스트입니다 테스트입니다 테스트입니다 ',
  //         content: 'test',
  //         level: 1,
  //         isSolved: false,
  //       },
  //       {
  //         name: '두번째',
  //         content: '가갸거겨',
  //         level: 2,
  //         isSolved: true,
  //       },
  //       ]
  //     },
  //     {
  //       intraId: 'fff',
  //       grade: 3,
  //       subjects: [
  //       {
  //         name: '테스트입니다 테스트입니다 테스트입니다 테스트입니다 테스트입니다 테스트입니다 테스트입니다 테스트입니다 테스트입니다 테스트입니다 테스트입니다 테스트입니다 ',
  //         content: 'test',
  //         level: 1,
  //         isSolved: false,
  //       },
  //       {
  //         name: '두번째',
  //         content: '가갸거겨',
  //         level: 2,
  //         isSolved: false,
  //       },
  //       ]
  //     }
  //   ];  

  const handleStart = async () => {
    try {
      const res = await fetch(`http://localhost:8080/blind/admin/competition`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        alert('대회가 시작되었습니다.');
      } else {
        console.log('res not ok');
      }
    } catch (error) {
      alert(error);
      console.log('error: ', error);
    }
  };

  const handleFinish = async () => {
    try {
      const res = await fetch(`http://localhost:8080/blind/admin/competition`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        alert('대회가 종료되었습니다.');
      } else {
        console.log('res not ok');
      }
    } catch (error) {
      alert(error);
      console.log('error: ', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:8080/blind/admin/subject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        alert('문제가 정상적으로 등록되었습니다.');
        setLevel('');
        setSubjectTitle('');
        setSubjectContent('');
        setTestCase('');
        setCorrectOutput('');
      } else {
        console.log('res not ok');
      }
    } catch (error) {
      alert(error);
      console.log('error: ', error);
    }
  };

  const handleResultList = async () => {
    try {
      const res = await fetch(`http://localhost:8080/blind/admin/result/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const data = await res.json();
        setListData(data);
      } else {
        console.log('res not ok');
      }
    } catch (error) {
      alert(error);
      console.log('error: ', error);
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
            />
          </div>

          <div className={styles.inputWrapper}>
            <div className={styles.title}>문제 이름</div>
            <input
              type="text"
              value={subjectTitle}
              onChange={(e) => setSubjectTitle(e.target.value)}
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
                          <div key={`${index}_${id}`} className={styles.listDetail}>
                            {sub.isSolved ? <p>✅</p> : <p>❌</p>}
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
