package com.trip_mn_sys.controllers;

import com.trip_mn_sys.entities.Student;
import com.trip_mn_sys.entities.Teacher;
import com.trip_mn_sys.entities.dto.StudentResponse;
import com.trip_mn_sys.services.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/students")
@AllArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @GetMapping
    public List<StudentResponse> getStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("{id}")
    public Student getStudentById(@PathVariable Integer id){
        return studentService.getStudentById(id);
    }

    @PostMapping("/{classRoomId}")
    public void addStudent( @RequestBody Student student, @PathVariable int classRoomId){
        studentService.addStudent(student,classRoomId);
    }

    @GetMapping("/listWithLocation")
    public List<Student> getStudentsWithLocation(){
        return studentService.getStudentsWithLocation();
    }

    @GetMapping("teacherOfStudent/{id}")
    public Teacher getTeacherOfStudent(@PathVariable Integer id){
        return studentService.getTeacherOfStudent(id);
    }
}
