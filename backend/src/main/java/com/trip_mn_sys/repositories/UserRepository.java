package com.trip_mn_sys.repositories;

import com.trip_mn_sys.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
