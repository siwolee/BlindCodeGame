package gg.blind.user.dto;

import gg.blind.data.entity.Subject;
import gg.blind.data.entity.UserSubject;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class SubjectResDto {
	private String name;
	private String content;
	private int level;
	private boolean isSolved;

	public SubjectResDto(Subject subject) {
		this.name = subject.getName();
		this.content = subject.getContent();
		this.level = subject.getLevel();
		this.isSolved = false;
	}

	public SubjectResDto(Subject subject, UserSubject userSubject) {
		this.name = subject.getName();
		this.content = subject.getContent();
		this.level = subject.getLevel();
		this.isSolved = userSubject.getIsSolved();
	}

	public SubjectResDto(Subject subject, boolean isSolved) {
		this.name = subject.getName();
		this.content = subject.getContent();
		this.level = subject.getLevel();
		this.isSolved = isSolved;
	}
}
