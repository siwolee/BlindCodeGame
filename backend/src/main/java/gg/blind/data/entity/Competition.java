package gg.blind.data.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;

@Getter
@Entity
public class Competition {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "is_end")
	private Boolean isEnd;
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	public Competition() {
		this.isEnd = false;
		this.createdAt = LocalDateTime.now();
	}

	public void endCompetition() {
		this.isEnd = true;
	}
}
