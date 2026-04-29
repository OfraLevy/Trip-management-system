import { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  Circle,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { studentsWithLocation } from "../services/StudentService";
import { teachersWithLocation } from "../services/TeacherService";

export default function LocationsMap({ user, teacherLocation }) {
  const position =
    user?.location?.latitude != null && user?.location?.longitude != null
      ? {
          lat: user.location.latitude,
          lng: user.location.longitude,
        }
      : {
          lat: 31.953362,
          lng: 34.822667,
        };
  const [selectedPerson, setSelectedPerson] = useState(null);
  const API_KEY = "AIzaSyDmKZGJueRNGcmaV3rMCc4WWHCBgijpsSo";
  const MAP_ID = "6bc8442b7796775c2646cf63";
  const RADIUS = 3000; // 3KM
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    refreshLocations();
    const intervalId = setInterval(() => {
      refreshLocations();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <APIProvider
      apiKey={API_KEY}
      language="iw"
      region="IL"
      libraries={["geometry"]}
    >
      <div style={{ width: "100%", height: "500px" }}>
        <Map defaultZoom={15} defaultCenter={position} mapId={MAP_ID}>
          <AdvancedMarker
            position={position}
            onClick={() =>
              setSelectedPerson({
                name: user.fullName,
                position: {
                  lat: user.location.latitude,
                  lng: user.location.longitude,
                },
              })
            }
          ></AdvancedMarker>
          <Circle
            center={{
              lat: teacherLocation?.latitude,
              lng: teacherLocation?.longitude,
            }}
            radius={RADIUS}
            fillColor={"#0088ff"}
            fillOpacity={0.1}
            strokeColor={"#0088ff"}
            strokeWeight={2}
          />

          {students.map((student) => {
            if (!student.location || student.id === user?.id) return null;
            return (
              <StudentMarker
                key={student.id}
                student={student}
                teacherLocation={teacherLocation}
              />
            );
          })}
          {teachers.map((teacher) => {
            if (!teacher.location || teacher.id === user?.id) return null;

            return (
              <AdvancedMarker
                key={teacher.id}
                position={{
                  lat: teacher.location.latitude,
                  lng: teacher.location.longitude,
                }}
                onClick={() =>
                  setSelectedPerson({
                    name: teacher.fullName,
                    position: {
                      lat: teacher.location.latitude,
                      lng: teacher.location.longitude,
                    },
                  })
                }
              >
                <Pin
                  background={"blue"}
                  borderColor={"darkblue"}
                  glyphColor={"white"}
                />
              </AdvancedMarker>
            );
          })}

          {selectedPerson && (
            <InfoWindow
              position={selectedPerson.position}
              onCloseClick={() => setSelectedPerson(null)}
            >
              <p>{selectedPerson.name}</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );

  function StudentMarker({ student, teacherLocation }) {
    const geometryLib = useMapsLibrary("geometry");
    return (
      <AdvancedMarker
        key={student.id}
        position={{
          lat: student.location.latitude,
          lng: student.location.longitude,
        }}
        onClick={() =>
          setSelectedPerson({
            name: student.fullName,
            position: {
              lat: student.location.latitude,
              lng: student.location.longitude,
            },
          })
        }
      >
        {teacherLocation &&
        computeDistanceBetween(
          {
            lat: student.location.latitude,
            lng: student.location.longitude,
          },
          {
            lat: teacherLocation?.latitude,
            lng: teacherLocation?.longitude,
          },
        ) < RADIUS ? (
          <Pin
            background={"green"}
            borderColor={"darkgreen"}
            glyphColor={"white"}
          />
        ) : (
          <Pin
            background={"red"}
            borderColor={"darkred"}
            glyphColor={"white"}
          />
        )}
      </AdvancedMarker>
    );
    function computeDistanceBetween(pointA, pointB) {
      if (!geometryLib) return Infinity;
      return geometryLib.spherical.computeDistanceBetween(
        new window.google.maps.LatLng(pointA.lat, pointA.lng),
        new window.google.maps.LatLng(pointB.lat, pointB.lng),
      );
    }
  }

  function refreshLocations() {
    studentsWithLocation()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });

    teachersWithLocation()
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      });
  }
}
