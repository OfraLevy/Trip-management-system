package com.trip_mn_sys.services;

import com.trip_mn_sys.entities.Location;
import com.trip_mn_sys.entities.Teacher;
import com.trip_mn_sys.repositories.TeacherRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

@AllArgsConstructor
@Service
public class TeacherService {
    private final TeacherRepository teacherRepository;


    public List<Teacher> getAllTeachers(){
        return teacherRepository.findAll();
    }

    public void addTeacher(Teacher teacher) {
        if (teacherRepository.existsById(teacher.getId())) {
            throw new IllegalArgumentException("Teacher already exists");
        }
        teacherRepository.save(teacher);
    }

    public Teacher getTeacherById(int id) {
        return teacherRepository.findById(id)
                .orElseThrow(()-> new NoSuchElementException(id+" teacher not found"));
    }

    public void setTeacherLocation(int id, Location location) {
        Teacher teacher = getTeacherById(id);
        teacher.setLocation(location);
        teacherRepository.save(teacher);
    }

    public List<Teacher> getTeachersWithLocation(){
        return teacherRepository.findAll().stream().filter(teacher -> teacher.getLocation()!=null).toList();
    }
}
