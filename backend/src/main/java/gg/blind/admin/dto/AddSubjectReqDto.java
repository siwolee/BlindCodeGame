package gg.blind.admin.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class AddSubjectReqDto {
	private String name;
	private String content;
	private int level;
	private String testCase;
	private String correctOutput;
}
