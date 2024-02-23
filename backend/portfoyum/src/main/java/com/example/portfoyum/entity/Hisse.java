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
    private long id;


    private long user_id;

    private String hisse_ad;
    private float fiyat;
    private long miktar;
    private float maliyet;

    public Hisse(long user_id, String hisse_ad, long fiyat, long miktar, long maliyet) {
        this.user_id = user_id;
        this.hisse_ad = hisse_ad;
        this.fiyat = fiyat;
        this.miktar = miktar;
        this.maliyet = maliyet;
    }
}
