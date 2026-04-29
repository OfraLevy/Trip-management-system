package com.trip_mn_sys.controllers;


import com.trip_mn_sys.entities.ClassRoom;
import com.trip_mn_sys.entities.dto.StudentResponse;
import com.trip_mn_sys.services.ClassRoomService;
import com.trip_mn_sys.services.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/classes")
@AllArgsConstructor
public class ClassRoomController {
    private final ClassRoomService classRoomService;

    @GetMapping
    public List<ClassRoom> getClasses() {
        return classRoomService.getAllClasses();
    }

}
