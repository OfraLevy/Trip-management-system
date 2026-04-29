package com.trip_mn_sys.repositories;

import com.trip_mn_sys.entities.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
}

