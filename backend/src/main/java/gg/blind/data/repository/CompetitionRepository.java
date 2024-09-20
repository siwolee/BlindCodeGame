package gg.blind.data.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import gg.blind.data.entity.Competition;

public interface CompetitionRepository extends JpaRepository<Competition, Long> {
	Optional<Competition> findByIsEndFalse();

	Optional<Competition> findByIsEndTrueOrderByIdDesc();
}
