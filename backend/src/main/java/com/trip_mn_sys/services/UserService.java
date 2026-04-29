package com.trip_mn_sys.services;

import com.trip_mn_sys.entities.Role;
import com.trip_mn_sys.entities.Student;
import com.trip_mn_sys.entities.User;
import com.trip_mn_sys.entities.dto.RegisterUserDto;
import com.trip_mn_sys.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.management.InstanceAlreadyExistsException;
import java.util.NoSuchElementException;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final TeacherService teacherService;
    private final StudentService studentService;
    // Create an encoder with strength 16
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);

    public User login(String username, String password) {
        User user = userRepository.findAll().stream().filter(u -> u.getUsername().equals(username)).findFirst().orElse(null);
        if (user == null)
            throw new UsernameNotFoundException("User not found");
        if (!encoder.matches(password, user.getPassword())) {
            throw new BadCredentialsException("Wrong password");
        }
        return user;
    }

    public User register(RegisterUserDto registerUserDto) {
        User user = userRepository.findAll().stream()
                .filter(u -> u.getUsername().equals(registerUserDto.userName()))
                .findFirst().orElse(null);
        if (user != null)
            try {
                throw new InstanceAlreadyExistsException("User already exists");
            } catch (InstanceAlreadyExistsException e) {
                throw new RuntimeException(e);
            }

        if (registerUserDto.teacher()) {
            try {
                teacherService.getTeacherById(registerUserDto.id());
                String encodedPassword = encoder.encode(registerUserDto.password());
                user = User.builder()
                        .username(registerUserDto.userName())
                        .password(encodedPassword)
                        .role(Role.TEACHER)
                        .build();
                userRepository.save(user);
                return user;
            } catch (Exception e) {
                throw new NoSuchElementException("Teacher not found");
            }
        } else {
            try {
                studentService.getStudentById(registerUserDto.id());
                String encodedPassword = encoder.encode(registerUserDto.password());
                user = User.builder()
                        .username(registerUserDto.userName())
                        .password(encodedPassword).role(Role.STUDENT)
                        .build();
                userRepository.save(user);
                return user;
            } catch (Exception e) {
                throw new NoSuchElementException("Student not found");
            }
        }
    }

    public Student getStudentByUser(User user) {
        
    }
}
