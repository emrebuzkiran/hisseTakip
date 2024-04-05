package com.example.portfoyum.service;

import com.example.portfoyum.dto.HisseDTO;
import com.example.portfoyum.entity.Hisse;
import com.example.portfoyum.repository.HisseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HisseService {
    private final HisseRepository hisseRepository;

    public HisseService(HisseRepository hisseRepository) {
        this.hisseRepository = hisseRepository;
    }

    public Hisse createHisse(HisseDTO request) {
        Hisse newHisse = Hisse.builder()
                .userId(request.user_id())
                .hisse_ad(request.hisse_ad())
                .fiyat(request.fiyat())
                .miktar(request.miktar())
                .maliyet(request.maliyet())
                .build();

        return hisseRepository.save(newHisse);
    }

    public List<Hisse> getHisseByUserId(long userId) {
        return hisseRepository.findAllByUserId(userId);
    }

}
