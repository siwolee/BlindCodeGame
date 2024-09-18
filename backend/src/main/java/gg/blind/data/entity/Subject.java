package gg.blind.data.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import gg.blind.admin.dto.AddSubjectReqDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class Subject {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "name")
	private String name;
	@Column(name = "content")
	private String content;
	@Column(name = "level")
	private int level;
	@Column(name = "test_case")
	private String testCase;
	@Column(name = "correct_output")
	private String correctOutput;

	public Subject(AddSubjectReqDto addSubjectReqDto) {
		this.name = addSubjectReqDto.getName();
		this.content = addSubjectReqDto.getContent();
		this.level = addSubjectReqDto.getLevel();
		this.testCase = addSubjectReqDto.getTestCase();
		this.correctOutput = addSubjectReqDto.getCorrectOutput();
	}
}
