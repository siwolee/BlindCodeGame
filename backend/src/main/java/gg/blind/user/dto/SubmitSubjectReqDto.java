package gg.blind.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class SubmitSubjectReqDto {
	private int level;
	private String code;
}
