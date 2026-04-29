package com.trip_mn_sys.services;

import com.trip_mn_sys.entities.Role;
import com.trip_mn_sys.entities.User;
import com.trip_mn_sys.entities.dto.RequestUser;
import com.trip_mn_sys.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final TeacherService teacherService;
    private final StudentService studentService;
    // Create an encoder with strength 10
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);

    public User login(String username, String password) {
        User user = userRepository.findAll().stream().filter(u -> u.getUsername().equals(username)).findFirst().orElse(null);
        if (user == null)
            throw new NoSuchElementException("User not found, please register first");
        if (!encoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Wrong password");
        }
        return user;
    }

    public User register(RequestUser requestUser) {
        User user = userRepository.findAll().stream()
                .filter(u -> u.getUsername().equals(requestUser.userName()))
                .findFirst().orElse(null);
        if (user != null)
            throw new IllegalArgumentException("User already exists");


        if (requestUser.teacher()) {
            teacherService.getTeacherById(requestUser.id());
            String encodedPassword = encoder.encode(requestUser.password());
            user = new User(requestUser.id(), requestUser.userName(), encodedPassword, Role.TEACHER);
        } else {
            studentService.getStudentById(requestUser.id());
            String encodedPassword = encoder.encode(requestUser.password());
            user = new User(requestUser.id(), requestUser.userName(), encodedPassword, Role.STUDENT);
        }
        userRepository.save(user);
        return user;
    }

    @PostConstruct
    public void createDefaultAdmin() {

        User user = userRepository.findAll()
                .stream()
                .filter(u -> u.getUsername().equals("admin"))
                .findFirst()
                .orElse(null);

        if (user == null) {
            String password = encoder.encode("ofra");

            userRepository.save(
                    new User(
                            1,
                            "admin",
                            password,
                            Role.ADMIN
                    )
            );
        }
    }
}
