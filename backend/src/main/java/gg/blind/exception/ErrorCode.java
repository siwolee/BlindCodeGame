package gg.blind.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {
	NOT_START(400, "B001", "아직 시작하지 않았습니다."),
	ALREADY_DONE(400, "B002", "이미 완료한 사용자입니다."),
	NOT_USER(400, "B003", "게임에 참가한 유저가 아닙니다."),
	NOT_SUBJECT(404, "B004", "해당 문제가 존재하지 않습니다."),
	ALREADY_COMPETITION(409, "B005", "이미 시작한 대회가 있습니다."),
	ALREADY_SOLVED(409, "B006", "이미 해결한 문제 입니다."),
	ALREADY_SUBJECT(409, "B007", "중복되는 레벨 입니다."),;

	private final int status;
	private final String errCode;
	private String message;

}
