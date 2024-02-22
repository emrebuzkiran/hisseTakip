package com.example.portfoyum.controller;

import com.example.portfoyum.dto.HisseDTO;
import com.example.portfoyum.service.HisseService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hisse")
public class HisseController {
    private final HisseService hisseService;

    public HisseController(HisseService hisseService) {
        this.hisseService = hisseService;
    }

    @PostMapping("/add")
    public void addHisse(@RequestBody HisseDTO hisseDTO) {
        hisseService.addHisse(hisseDTO);

    }

    @GetMapping("/testy")
    public String test() {
        return "test";
    }
}
