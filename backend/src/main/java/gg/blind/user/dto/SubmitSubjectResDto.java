package gg.blind.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class SubmitSubjectResDto {
	private String testCase;
	private String userOutput;
	private String errorOutput;
	private String correctOutput;
	private boolean isSolved;

	public SubmitSubjectResDto(String testCase, String userOutput, String errorOutput, String correctOutput, boolean isSolved) {
		this.testCase = testCase;
		this.userOutput = userOutput;
		this.errorOutput = errorOutput;
		this.correctOutput = correctOutput;
		this.isSolved = isSolved;
	}
}
