package gg.blind.data.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import gg.blind.data.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByIntraId(String intraId);
}
