package gg.blind.user.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class TimeResDto {
	private LocalDateTime time;

	public TimeResDto(LocalDateTime time) {
		this.time = time;
	}
}
