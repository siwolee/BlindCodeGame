package gg.blind.data.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class UserSubject {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "user_id")
	private Long userId;
	@Column(name = "subject_id")
	private Long subjectId;
	@Column(name = "is_solved")
	private Boolean isSolved;

	public UserSubject(Long id, Long id1, Boolean isCorrect) {
		this.userId = id;
		this.subjectId = id1;
		this.isSolved = isCorrect;
	}
}
