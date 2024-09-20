import Image from "next/image";
import Check from "../../public/image/check.svg";
import Cancel from "../../public/image/cancel.svg";
import styles from "../../styles/game/sidebar.module.scss";
import { SubjectProps } from "@/type/subjects";

interface SidebarProps {
  subjects: SubjectProps[];
  selectedSubject: SubjectProps | undefined;
  onSubjectClick: (subject: SubjectProps) => void;
  progress: string;
}

const sidebar = ({
  subjects,
  selectedSubject,
  onSubjectClick,
  progress,
}: SidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.indexs}>
        {selectedSubject &&
          subjects.map((subject, index) => (
            <div
              key={index}
              className={`${styles.index} ${
                selectedSubject.level === subject.level ? styles.selected : ""
              }`}
              onClick={() => onSubjectClick(subject)}
            >
              {subject.name}
              {subject.isSolved ? (
                <Image src={Check} alt="Check" className={styles.check} />
              ) : (
                <Image src={Cancel} alt="Cancel" className={styles.cancel} />
              )}
            </div>
          ))}
      </div>

      <div className={styles.progress}>
        <p>진행률</p>
        <p>{progress}</p>
      </div>
    </div>
  );
};

export default sidebar;
