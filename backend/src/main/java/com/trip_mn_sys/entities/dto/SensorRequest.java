package com.trip_mn_sys.entities.dto;

import java.util.Date;

public record SensorRequest(
        int ID,
        Coordinate Coordinates,
        Date Time

) {
}
