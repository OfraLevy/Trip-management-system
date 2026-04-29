package com.trip_mn_sys.controllers;

import com.trip_mn_sys.entities.User;
import com.trip_mn_sys.entities.dto.RequestUser;
import com.trip_mn_sys.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("api/users")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/login")
    public User login(@RequestParam String username, @RequestParam String password) {
        return userService.login(username, password);
    }

    @PostMapping("/register")
    public User register(@RequestBody RequestUser requestUser) {
        return userService.register(requestUser);
    }
}
