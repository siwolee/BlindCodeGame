package gg.blind.user.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import gg.blind.user.dto.GameResDto;
import gg.blind.user.dto.SubjectResDto;
import gg.blind.user.dto.SubmitSubjectReqDto;
import gg.blind.user.dto.SubmitSubjectResDto;
import gg.blind.user.dto.TimeResDto;
import gg.blind.user.service.UserService;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/blind")
public class UserController {
	private final UserService userService;

	@GetMapping("/game")
	public ResponseEntity<TimeResDto> getGame(@RequestParam String intraId)  {
		TimeResDto timeResDto = userService.getGame(intraId);
		return ResponseEntity.status(HttpStatus.OK).body(timeResDto);
	}

	@PostMapping("/game")
	public ResponseEntity<GameResDto> gameStart(@RequestParam String intraId) {
		GameResDto gameResDto = userService.gameStart(intraId);
		return ResponseEntity.status(HttpStatus.CREATED).body(gameResDto);
	}

	@GetMapping("/subject/list")
	public ResponseEntity<List<SubjectResDto>> getSubjectList(@RequestParam String intraId) {
		List<SubjectResDto> subjectResDto = userService.getSubjectList(intraId);
		return ResponseEntity.status(HttpStatus.OK).body(subjectResDto);
	}

	@PostMapping("/subject")
	public ResponseEntity<SubmitSubjectResDto> submitSubject(@RequestParam String intraId, @RequestBody SubmitSubjectReqDto submitSubjectReqDto) {
		SubmitSubjectResDto submitSubjectResDto = userService.submitSubject(intraId, submitSubjectReqDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(submitSubjectResDto);
	}

	@PatchMapping("/subject")
	public ResponseEntity<SubmitSubjectResDto> gameEnd(@RequestParam String intraId) {
		userService.gameEnd(intraId);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
}
