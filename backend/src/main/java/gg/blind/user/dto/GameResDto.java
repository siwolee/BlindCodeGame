package gg.blind.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class GameResDto {
	private String intraId;

	public GameResDto(String intraId) {
		this.intraId = intraId;
	}
}
