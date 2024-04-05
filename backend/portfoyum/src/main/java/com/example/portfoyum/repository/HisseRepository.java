package com.example.portfoyum.repository;

import com.example.portfoyum.entity.Hisse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HisseRepository extends JpaRepository<Hisse, Long> {
    List<Hisse> findAllByUserId(long user_Id);
}


