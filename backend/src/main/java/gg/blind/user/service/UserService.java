package gg.blind.user.service;

import static gg.blind.exception.ErrorCode.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gg.blind.compiler.CCompiler;
import gg.blind.compiler.CompileResult;
import gg.blind.data.entity.Competition;
import gg.blind.exception.BusinessException;
import gg.blind.exception.NotFoundException;
import gg.blind.data.entity.Subject;
import gg.blind.data.entity.User;
import gg.blind.data.entity.UserSubject;
import gg.blind.data.repository.CompetitionRepository;
import gg.blind.data.repository.SubjectRepository;
import gg.blind.data.repository.UserRepository;
import gg.blind.data.repository.UserSubjectRepository;
import gg.blind.user.dto.GameResDto;
import gg.blind.user.dto.SubjectResDto;
import gg.blind.user.dto.SubmitSubjectReqDto;
import gg.blind.user.dto.SubmitSubjectResDto;
import gg.blind.user.dto.TimeResDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	private final CCompiler cCompiler;
	private final UserRepository userRepository;
	private final SubjectRepository subjectRepository;
	private final UserSubjectRepository userSubjectRepository;
	private final CompetitionRepository competitionRepository;

	public TimeResDto getGame() {
		Competition competition = competitionRepository.findByIsEndFalse().orElseThrow(() -> new BusinessException(NOT_START));
		return new TimeResDto(competition.getCreatedAt());
	public TimeResDto getGame(String intraId) {
		competitionRepository.findByIsEndFalse().orElseThrow(() -> new BusinessException(NOT_START));
		User user = userRepository.findByIntraId(intraId).orElseThrow(() -> new NotFoundException(NOT_USER));
		return new TimeResDto(user.getCreatedAt());
	}

	@Transactional
	public GameResDto gameStart(String intraId) {
		competitionRepository.findByIsEndFalse().orElseThrow(() -> new BusinessException(NOT_START));
		User user = userRepository.save(new User(intraId));
		if (user.getIsDone())
			throw new BusinessException(ALREADY_DONE);
		return new GameResDto(user.getIntraId());
	}

	public List<SubjectResDto> getSubjectList(String intraId) {
		competitionRepository.findByIsEndFalse().orElseThrow(() -> new BusinessException(NOT_START));
		User user = userRepository.findByIntraId(intraId).orElseThrow(() -> new NotFoundException(NOT_USER));
		if (user.getIsDone())
			throw new BusinessException(ALREADY_DONE);
		List<Subject> subjects = subjectRepository.findAll();
		List<UserSubject> userSubjects = userSubjectRepository.findByUserId(user.getId());
		return subjects.stream().map(subject -> {
			UserSubject userSubject = userSubjects.stream()
				.filter(us -> us.getSubjectId().equals(subject.getId()))
				.findFirst()
				.orElse(null);

			if (userSubject != null) {
				return new SubjectResDto(subject, userSubject);
			} else {
				return new SubjectResDto(subject);
			}
		}).collect(Collectors.toList());
	}

	@Transactional
	public SubmitSubjectResDto submitSubject(String intraId, SubmitSubjectReqDto submitSubjectReqDto) {
		competitionRepository.findByIsEndFalse().orElseThrow(() -> new BusinessException(NOT_START));

		User user = userRepository.findByIntraId(intraId).orElseThrow(() -> new NotFoundException(NOT_USER));
		if (user.getIsDone()) {
			throw new BusinessException(ALREADY_DONE);
		}

		Subject subject = subjectRepository.findByLevel(submitSubjectReqDto.getLevel())
			.orElseThrow(() -> new NotFoundException(NOT_SUBJECT));

		UserSubject userSubject = userSubjectRepository.findByUserIdAndSubjectIdAndIsSolvedTrue(user.getId(), subject.getId())
			.orElse(null);

		if (userSubject != null) {
			throw new BusinessException(ALREADY_SOLVED);
		}

		String sourceCode = submitSubjectReqDto.getCode();
		String testCase = subject.getTestCase();
		String correctOutput = subject.getCorrectOutput();

		String sourceFileName = "temp_test.c";
		try (PrintWriter writer = new PrintWriter(sourceFileName)) {
			writer.write(sourceCode);
		} catch (IOException e) {
			throw new RuntimeException("Error writing source code to file", e);
		}

		CompileResult compileResult = cCompiler.compileAndRun(sourceFileName, testCase);

		boolean isCorrect = compileResult.getOutput().trim().equals(correctOutput.trim());

		SubmitSubjectResDto result = new SubmitSubjectResDto(testCase, compileResult.getOutput(), compileResult.getError(),correctOutput, isCorrect);

		userSubjectRepository.save(new UserSubject(user.getId(), subject.getId(), isCorrect));
		return result;
	}

	@Transactional
	public void gameEnd(String intraId) {
		competitionRepository.findByIsEndFalse().orElseThrow(() -> new BusinessException(NOT_START));
		User user = userRepository.findByIntraId(intraId).orElseThrow(() -> new NotFoundException(NOT_USER));
		if (user.getIsDone())
			throw new BusinessException(ALREADY_DONE);
		user.setIsDone(true);
		userRepository.save(user);
	}


}
