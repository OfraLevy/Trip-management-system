package com.trip_mn_sys.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    @Id
    private int id;
    private String fullName;

    @ManyToOne
    @JoinColumn(name = "classroom_id")
    @JsonIgnore
    private ClassRoom classRoom;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @Embedded
    private Location location;
}
