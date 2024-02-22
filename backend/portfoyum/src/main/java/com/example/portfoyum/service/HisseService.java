package com.example.portfoyum.service;

import com.example.portfoyum.dto.HisseDTO;
import com.example.portfoyum.entity.Hisse;
import com.example.portfoyum.repository.HisseRepository;
import org.springframework.stereotype.Service;

@Service
public class HisseService {
    private final HisseRepository hisseRepository;

    public HisseService(HisseRepository hisseRepository) {
        this.hisseRepository = hisseRepository;
    }

    public void addHisse(HisseDTO hisseDTO) {
        hisseRepository.save(new Hisse(hisseDTO.hissead(), hisseDTO.fiyat(), hisseDTO.miktar(), hisseDTO.maliyet()));
    }
}
