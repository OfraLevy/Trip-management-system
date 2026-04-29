package com.trip_mn_sys.repositories;

import com.trip_mn_sys.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {
}
