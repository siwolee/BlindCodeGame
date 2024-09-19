package gg.blind.data.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import gg.blind.data.entity.User;
import gg.blind.data.entity.UserSubject;

public interface UserSubjectRepository extends JpaRepository<UserSubject, Long> {
	List<UserSubject> findByUserId(Long userId);

	Optional<UserSubject> findByUserIdAndSubjectIdAndIsSolvedTrue(Long userId, Long subjectId);
}
