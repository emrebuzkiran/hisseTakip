package com.example.portfoyum.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "hisse")
public class Hisse  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long varlikid;

    private long user_id;


    private String hissead;
    private long fiyat;
    private long miktar;
    private long maliyet;


    public Hisse(String hissead, long fiyat, long miktar, long maliyet) {
        this.hissead = hissead;
        this.fiyat = fiyat;
        this.miktar = miktar;
        this.maliyet = maliyet;
    }
}
