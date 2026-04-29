package com.trip_mn_sys.entities.dto;

import com.trip_mn_sys.entities.Location;

public record StudentResponse(
        int id,
        String fullName,
        String className,
        Location location
) {}
