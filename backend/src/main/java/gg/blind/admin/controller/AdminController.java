package gg.blind.admin.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import gg.blind.admin.dto.AddSubjectReqDto;
import gg.blind.admin.dto.ResultResDto;
import gg.blind.admin.service.AdminService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/blind/admin")
public class AdminController {
	private final AdminService adminService;

	@PostMapping("/subject")
	public ResponseEntity<Void> createSubject(@RequestBody AddSubjectReqDto addSubjectReqDto) {
		adminService.createSubject(addSubjectReqDto);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@PostMapping("/competition")
	public ResponseEntity<Void> startCompetition() {
		adminService.startCompetition();
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@PatchMapping("/competition")
	public ResponseEntity<Void> endCompetition() {
		adminService.endCompetition();
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

	@GetMapping("/result/list")
    public ResponseEntity<List<ResultResDto>> getResultList() {
		List<ResultResDto> resultResDtoList = adminService.getResultList();
		return ResponseEntity.status(HttpStatus.OK).body(resultResDtoList);
	}
}
