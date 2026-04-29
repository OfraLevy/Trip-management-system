package com.trip_mn_sys.services;

import com.trip_mn_sys.entities.Location;
import com.trip_mn_sys.entities.dto.CoordinatePart;
import com.trip_mn_sys.entities.dto.SensorRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@AllArgsConstructor
@Service
public class SensorService {
    private StudentService studentService;
    private TeacherService teacherService;

    private double convertToDecimal(CoordinatePart coordinatePart) {
        if (coordinatePart.Degrees()>=0)
            return coordinatePart.Degrees()
                    + coordinatePart.Minutes() / 60.0
                    + coordinatePart.Seconds() / 3600.0;
        else
            return coordinatePart.Degrees()
            - coordinatePart.Minutes() / 60.0
            - coordinatePart.Seconds() / 3600.0;
    }

    public void setLocation(SensorRequest sensorRequest) {

        try {teacherService.setTeacherLocation(sensorRequest.ID(), new Location(
                convertToDecimal(sensorRequest.Coordinates().Longitude()),
                convertToDecimal(sensorRequest.Coordinates().Latitude()),
                sensorRequest.Time()));
        }catch (Exception e){
            try {
                studentService.setStudentLocation(sensorRequest.ID(), new Location(
                        convertToDecimal(sensorRequest.Coordinates().Longitude()),
                        convertToDecimal(sensorRequest.Coordinates().Latitude()),
                        sensorRequest.Time()
                ));
            }catch (Exception e2){
                throw new NoSuchElementException("No such user");
            }
        }
    }
}

