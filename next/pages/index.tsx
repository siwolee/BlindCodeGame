import styles from "../styles/home/home.module.scss";
import { useState } from 'react';
import { useRouter } from 'next/router';


export default function HomePage() {
  const router = useRouter(); // useRouter 사용
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async () => {
    try {
      // API 호출 코드 추가 예정
      console.log(inputValue);
      router.push('/game');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const title = '🙇🏻‍♀️ 석봉아 코드를 썰거라 🙇🏼‍♂️';

  const content = `안 보이는 채로 코드를 작성해서 자신의 타자력을 뽐내보아요! 
  원격 참여도 가능하게 열어놓을 예정입니다. 
  하지만 상품은 대회 신청한 사람 && 현장 참석자에 한해 증정될 예정입니다!

  🖥️ 사용 언어 🖥️ : C
  ⏳ 제한 시간 ⏳ : 30분
  ❗️ 주의 사항 ❗️ : 대회 컨셉에 맞게 블라인드로 진행 부탁드립니다 🙏
  🚫 개발자 도구 금지, 🚫 복사/붙여넣기 금지, 🚫 url에 코드 사용 금지    
  `;

  return (
    <div className={styles.layout}>
      <div className={styles.homeContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.title}>{title}</div>
          <div className={styles.content}>
            {content.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </div>
        </div>

        <div className={styles.formContainer}>
          <input
            className={styles.inputBox}
            type="text"
            placeholder="인트라 아이디 입력"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className={styles.submitBtn} onClick={handleSubmit}>
            확 인
          </button>
        </div>
      </div>
    </div>
  );
}
