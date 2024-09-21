package gg.blind.data.entity;

import java.time.LocalDateTime;

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
public class User {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "intra_id")
	private String intraId;
	@Column(name = "grade")
	private int grade;
	@Column(name = "is_done")
	private Boolean isDone;
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	public User(String intraId) {
		this.intraId = intraId;
		this.grade = 0;
		this.isDone = false;
		this.createdAt = LocalDateTime.now();
	}

	public void increaseGrade() {
		this.grade++;
	}

	public void setIsDone(Boolean isDone) {
		this.isDone = isDone;
	}
}
