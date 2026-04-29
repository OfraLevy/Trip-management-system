package com.trip_mn_sys.controllers;

import com.trip_mn_sys.entities.dto.SensorRequest;
import com.trip_mn_sys.services.SensorService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("api/sensors")
@AllArgsConstructor
public class SensorController {
    private final SensorService sensorService;

    @PostMapping
    public void setSensorLocation(@RequestBody SensorRequest sensorRequest) {
        sensorService.setLocation(sensorRequest);
    }
}
