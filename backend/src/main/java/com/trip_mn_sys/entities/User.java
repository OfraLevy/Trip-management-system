package com.trip_mn_sys.entities;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private int id;

    private String username;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;
}