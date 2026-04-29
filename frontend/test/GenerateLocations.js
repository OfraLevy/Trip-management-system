import { listStudents } from "../src/services/StudentService";
import { listTeachers } from "../src/services/TeacherService";
import { setSensorLocation } from "../src/services/SensorService";

async function startSimulator() {
  setInterval(async () => {
    const data = await generateLocations();
    if (data) {
      await setSensorLocation(data);
    }
  }, 5000);
}

startSimulator();

async function generateLocations() {
  const studentsResponse = await listStudents();
  const teachersResponse = await listTeachers();

  const students = studentsResponse.data;
  const teachers = teachersResponse.data;
  const returnData = {
    ID: 0,
    Coordinates: {
      Longitude: { Degrees: "34", Minutes: "46", Seconds: "44" },
      Latitude: { Degrees: "32", Minutes: "5", Seconds: "23" },
    },
    Time: "YYYY-MM-DDTHH:MM:SSZ",
  };
  if (students.length === 0 && teachers.length === 0) {
    return null;
  }
  const teacherOrStudent =
    Math.random() < teachers.length / (students.length + teachers.length);
  const randomMovement = Math.floor(Math.random() * 11) - 5;
  const latitudeOrLongitude = Math.random() < 0.5;
  if (teacherOrStudent) {
    const randomTeacher = teachers[Math.floor(Math.random() * teachers.length)];
    returnData.ID = randomTeacher.id;
    returnData.Coordinates = changeLocation(
      randomTeacher.location,
      randomMovement,
      latitudeOrLongitude,
    );
    returnData.Time = new Date().toISOString();
    return returnData;
  } else {
    const randomStudent = students[Math.floor(Math.random() * students.length)];
    returnData.ID = randomStudent.id;
    returnData.Coordinates = changeLocation(
      randomStudent.location,
      randomMovement,
      latitudeOrLongitude,
    );
    returnData.Time = new Date().toISOString();
    return returnData;
  }
}

function changeLocation(coordinate, randomMovement, latitudeOrLongitude) {
  if (
    !coordinate ||
    coordinate.latitude == null ||
    coordinate.longitude == null
  ) {
    return {
      Longitude: { Degrees: "34", Minutes: "46", Seconds: "44" },
      Latitude: { Degrees: "32", Minutes: "5", Seconds: "23" },
    };
  }
  if (latitudeOrLongitude) {
    const newLatitude = decimalToCoordinate(coordinate.latitude);
    newLatitude.Seconds += randomMovement;
    if (newLatitude.Seconds >= 60) {
      newLatitude.Seconds -= 60;
      newLatitude.Minutes += 1;
    }
    if (newLatitude.Minutes >= 60) {
      newLatitude.Minutes -= 60;
      newLatitude.Degrees += 1;
    }
    if (newLatitude.Seconds < 0) {
      newLatitude.Seconds += 60;
      newLatitude.Minutes -= 1;
    }
    if (newLatitude.Minutes < 0) {
      newLatitude.Minutes += 60;
      newLatitude.Degrees -= 1;
    }
    const newLongitude = decimalToCoordinate(coordinate.longitude);
    return {
      Longitude: {
        Degrees: newLongitude.Degrees.toString(),
        Minutes: newLongitude.Minutes.toString(),
        Seconds: newLongitude.Seconds.toString(),
      },
      Latitude: {
        Degrees: newLatitude.Degrees.toString(),
        Minutes: newLatitude.Minutes.toString(),
        Seconds: newLatitude.Seconds.toString(),
      },
    };
  } else {
    const newLongitude = decimalToCoordinate(coordinate.longitude);
    newLongitude.Seconds += randomMovement;
    if (newLongitude.Seconds >= 60) {
      newLongitude.Seconds -= 60;
      newLongitude.Minutes += 1;
    }
    if (newLongitude.Minutes >= 60) {
      newLongitude.Minutes -= 60;
      newLongitude.Degrees += 1;
    }
    if (newLongitude.Seconds < 0) {
      newLongitude.Seconds += 60;
      newLongitude.Minutes -= 1;
    }
    if (newLongitude.Minutes < 0) {
      newLongitude.Minutes += 60;
      newLongitude.Degrees -= 1;
    }
    const newLatitude = decimalToCoordinate(coordinate.latitude);
    return {
      Longitude: {
        Degrees: newLongitude.Degrees.toString(),
        Minutes: newLongitude.Minutes.toString(),
        Seconds: newLongitude.Seconds.toString(),
      },
      Latitude: {
        Degrees: newLatitude.Degrees.toString(),
        Minutes: newLatitude.Minutes.toString(),
        Seconds: newLatitude.Seconds.toString(),
      }
    };
  }
}

function decimalToCoordinate(decimal) {
  const sign = decimal < 0 ? -1 : 1;
  const absolute = Math.abs(decimal);

  const degrees = Math.floor(absolute);

  const minutesFull = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesFull);

  const secondsFull = (minutesFull - minutes) * 60;
  const seconds = Math.round(secondsFull);

  return {
    Degrees: degrees * sign,
    Minutes: minutes,
    Seconds: seconds,
  };
}
