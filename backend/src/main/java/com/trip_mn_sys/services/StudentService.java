package com.trip_mn_sys.services;

import com.trip_mn_sys.entities.ClassRoom;
import com.trip_mn_sys.entities.Location;
import com.trip_mn_sys.entities.Student;
import com.trip_mn_sys.entities.Teacher;
import com.trip_mn_sys.entities.dto.StudentResponse;
import com.trip_mn_sys.repositories.ClassRoomRepository;
import com.trip_mn_sys.repositories.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

@AllArgsConstructor
@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final ClassRoomRepository classRoomRepository;

    public List<StudentResponse> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .map(student -> new StudentResponse(
                        student.getId(),
                        student.getFullName(),
                        student.getClassRoom() != null
                                ? student.getClassRoom().getName()
                                : null,
                        student.getLocation()
                ))
                .toList();
    }

    public void addStudent(Student student, int classRoomId) {
        if (studentRepository.existsById(student.getId())) {
            throw new IllegalArgumentException("Student already exists");
        }
        ClassRoom classRoom = classRoomRepository.findById(classRoomId)
                .orElseThrow(() -> new NoSuchElementException(classRoomId + " class room not found"));

        student.setClassRoom(classRoom);

        studentRepository.save(student);
    }

    public Student getStudentById(int id) {
        return studentRepository.findById(id)
                .orElseThrow(()-> new NoSuchElementException(id+" student not found"));
    }

    public void setStudentLocation(int id,Location location){
        Student student = getStudentById(id);
        student.setLocation(location);
        studentRepository.save(student);
    }

    public List<Student> getStudentsWithLocation(){
        return studentRepository.findAll().stream().filter(student -> student.getLocation()!=null).toList();
    }

    public Teacher getTeacherOfStudent(int id){
        Student student = getStudentById(id);
        return student.getClassRoom().getTeacher();
    }
}
