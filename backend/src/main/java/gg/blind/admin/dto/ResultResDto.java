package gg.blind.admin.dto;

import java.util.List;

import gg.blind.user.dto.SubjectResDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class ResultResDto {
	private String intraId;
	private int grade;
	private List<SubjectResDto> subjects;

	public ResultResDto(String intraId, int grade, List<SubjectResDto> subjects) {
		this.intraId = intraId;
		this.grade = grade;
		this.subjects = subjects;
	}
}
