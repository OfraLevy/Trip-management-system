package com.trip_mn_sys.entities.dto;

public record RequestUser(
        int id,
        String userName,
        boolean teacher,
        String password
) {}
