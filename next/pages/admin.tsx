import styles from "../styles/admin/admin.module.scss";
import { useState } from 'react';

export default function AdminPage() {
  const [level, setLevel] = useState('');
  const [subjectTitle, setSubjectTitle] = useState('');
  const [subjectContent, setSubjectContent] = useState('');
  const [testCase, setTestCase] = useState('');
  const [correctOutput, setCorrectOutput] = useState('');

  const handleSubmit = async () => {
    try {
      // 문제 등록 POST API 호출 코드 추가 예정
      console.log(level, subjectTitle, subjectContent, testCase, correctOutput);

      setLevel('');
      setSubjectTitle('');
      setSubjectContent('');
      setTestCase('');
      setCorrectOutput('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleResultList = async () => {
    try {
      // 대회 결과 GET API 호출 추가 예정

    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div className={styles.logo}>Admin Page</div>
        <div className={styles.btnContainer}>
          <button className={styles.adminBtn}>대회 시작</button>
          <button className={styles.adminBtn}>대회 종료</button>
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
            <button className={styles.adminBtn} onClick={handleSubmit}>문제 등록하기</button>
          </div>
        </div>

        <div className={styles.subjectContainer}>
          <div className={styles.containerTitle}>대회 결과</div>

          <div className={styles.btnContainer}>
            <button className={styles.adminBtn} onClick={handleResultList}>대회 결과 조회</button>
          </div>

        </div>
      </div>
    </div>
  );
}
