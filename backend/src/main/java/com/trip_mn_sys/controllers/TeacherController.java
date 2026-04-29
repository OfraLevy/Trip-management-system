package com.trip_mn_sys.controllers;

import com.trip_mn_sys.entities.Location;
import com.trip_mn_sys.entities.Student;
import com.trip_mn_sys.entities.Teacher;
import com.trip_mn_sys.services.TeacherService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/teachers")
@AllArgsConstructor
public class TeacherController {
    private final TeacherService teacherService;

    @GetMapping
    public List<Teacher> getTeachers() {
        return teacherService.getAllTeachers();
    }

    @GetMapping("{id}")
    public Teacher getTeacherById(@PathVariable Integer id){
        return teacherService.getTeacherById(id);
    }

    @PostMapping
    public void addTeacher( @RequestBody Teacher teacher){
        teacherService.addTeacher(teacher);
    }

    @GetMapping("/listWithLocation")
    public List<Teacher> getTeachersWithLocation(){
        return teacherService.getTeachersWithLocation();
    }
}
