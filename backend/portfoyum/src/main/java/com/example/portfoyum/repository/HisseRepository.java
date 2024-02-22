package com.example.portfoyum.repository;

import com.example.portfoyum.entity.Hisse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HisseRepository extends JpaRepository<Hisse, Long> {


}
