package gg.blind.admin.service;

import static gg.blind.exception.ErrorCode.*;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import gg.blind.admin.dto.AddSubjectReqDto;
import gg.blind.admin.dto.ResultResDto;
import gg.blind.data.entity.Competition;
import gg.blind.data.entity.Subject;
import gg.blind.data.entity.User;
import gg.blind.data.entity.UserSubject;
import gg.blind.data.repository.CompetitionRepository;
import gg.blind.data.repository.SubjectRepository;
import gg.blind.data.repository.UserRepository;
import gg.blind.data.repository.UserSubjectRepository;
import gg.blind.exception.BusinessException;
import gg.blind.exception.DuplicationException;
import gg.blind.user.dto.SubjectResDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
	private final UserRepository userRepository;
	private final SubjectRepository subjectRepository;
	private final UserSubjectRepository userSubjectRepository;
	private final CompetitionRepository competitionRepository;

	public void createSubject(AddSubjectReqDto addSubjectReqDto) {
		Subject subject = new Subject(addSubjectReqDto);
		subjectRepository.save(subject);
	}

	@Transactional
	public void startCompetition() {
		competitionRepository.findByIsEndFalse().ifPresent(competition -> {
			throw new DuplicationException(ALREADY_COMPETITION);
		});
		Competition competition = new Competition();
		competitionRepository.save(competition);
	}

	@Transactional
	public void endCompetition() {
		Competition competition = competitionRepository.findByIsEndFalse().orElseThrow(() -> new BusinessException(NOT_START));
		competition.endCompetition();
		competitionRepository.save(competition);
	}

	public List<ResultResDto> getResultList() {
		List<User> users = userRepository.findAll();
		List<Subject> subjects = subjectRepository.findAll();
		List<UserSubject> userSubjects = userSubjectRepository.findAll();

		List<ResultResDto> userResults = new ArrayList<>();

		for (User user : users) {
			List<SubjectResDto> subjectResults = new ArrayList<>();

			for (Subject subject : subjects) {
				boolean isSolved = userSubjects.stream()
					.anyMatch(us -> us.getUserId().equals(user.getId()) && us.getSubjectId().equals(subject.getId()) && us.getIsSolved());
				subjectResults.add(new SubjectResDto(subject, isSolved));
			}
			userResults.add(new ResultResDto(user.getIntraId(), user.getGrade(), subjectResults));
		}

		return userResults;
	}
}
