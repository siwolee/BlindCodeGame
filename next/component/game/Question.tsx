// Question.tsx
import styles from "../../styles/game/question.module.scss";
import Image from "next/image";
import Check from "../../public/image/check.svg";
import Cancel from "../../public/image/cancel.svg";
import { SubjectProps } from "@/type/subjects";

interface QuestionProps {
  selectedSubject: SubjectProps;
}

const Question = ({ selectedSubject }: QuestionProps) => {
  return (
    <div className={styles.question}>
      <div className={styles.qTitle}>
        <p>{selectedSubject.name}</p>
        {selectedSubject.solved ? (
          <Image src={Check} alt="Check" className={styles.check} />
        ) : (
          <Image src={Cancel} alt="Cancel" className={styles.cancel} />
        )}
      </div>
      <div className={styles.qContent}>{selectedSubject.content}</div>
    </div>
  );
};

export default Question;
