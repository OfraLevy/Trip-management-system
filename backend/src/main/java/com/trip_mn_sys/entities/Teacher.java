package com.trip_mn_sys.entities;

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
public class Teacher  {
    @Id
    private int id;
    private String fullName;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "classroom_id")
    private ClassRoom classRoom;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @Embedded
    private Location location;
}
