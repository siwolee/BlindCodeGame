import styles from "../styles/home/home.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { BASE_URL } from "@/type/constant";
import axios from "axios";

interface HomeProps {
  setIsAllowed: (value: boolean) => void;
}

export default function HomePage({ setIsAllowed }: HomeProps) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async () => {
    if (inputValue === process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY) {
      setIsAllowed(true);
      router.push("/admin");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}game?intraId=${inputValue}`
      );
      if (response.status === 201) {
        setIsAllowed(true);
        router.push(`/game?intraId=${inputValue}`);
      }
    } catch (error) {
      alert("아직 시작되지 않았습니다.");
      console.error("Error fetching subjects:", error);
    }
  };

  const title = "🙇🏻‍♀️ 석봉아 코드를 썰거라 🙇🏼‍♂️";

  const content = `
  손의 감각으로 코드를 작성해서 자신의 타자력을 뽐내보아요!

  원격 참여도 가능하며,
  상품은 대회 신청 && 현장 참석자에 한하여 증정될 예정입니다!


  🖥️ 사용 언어 🖥️ : C
  ⏳ 제한 시간 ⏳ : 30분
  ❗️ 주의 사항 ❗️ : 대회 컨셉에 맞게 블라인드로 진행 부탁드립니다 🙏
  `;
  const subContent = `🚫 개발자 도구 금지 🚫
    🚫 복사/붙여넣기 금지 🚫
    🚫 url에 코드 사용 금지 🚫`;

  return (
    <div className={styles.layout}>
      <div className={styles.homeContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.title}>{title}</div>
          <div className={styles.content}>
            {content.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </div>
          <div className={styles.subcontent}>
            {subContent.split("\n").map((line, index) => (
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
