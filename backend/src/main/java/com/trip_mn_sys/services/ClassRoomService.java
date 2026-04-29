package com.trip_mn_sys.services;

import com.trip_mn_sys.entities.ClassRoom;
import com.trip_mn_sys.repositories.ClassRoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ClassRoomService {
    private final ClassRoomRepository classRoomRepository;

    public List<ClassRoom> getAllClasses() {
        return classRoomRepository.findAll();
    }
}
