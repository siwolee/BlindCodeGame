package gg.blind.data.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import gg.blind.data.entity.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
	Optional<Subject> findByLevel(int level);
}
