package com.trip_mn_sys.entities.dto;

public record RegisterUserDto(
        int id,
        String userName,
        Boolean teacher,
        String password,
        String checkPassword
) {}
