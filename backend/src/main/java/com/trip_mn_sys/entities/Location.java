package com.trip_mn_sys.entities;

import jakarta.persistence.Embeddable;

import java.util.Date;

@Embeddable
public record Location(
        double longitude,
        double latitude,
        Date lastUpdated
) { }
