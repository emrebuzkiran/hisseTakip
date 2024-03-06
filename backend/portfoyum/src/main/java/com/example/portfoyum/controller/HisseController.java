package com.example.portfoyum.controller;

import com.example.portfoyum.dto.HisseDTO;
import com.example.portfoyum.entity.Hisse;
import com.example.portfoyum.service.HisseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @CrossOrigin(origins = "http://localhost:3000")
    public Hisse addHisse(@RequestBody HisseDTO request) {
        return hisseService.createHisse(request);
    }

    @GetMapping("/testy")
    public String test() {
        return "test";
    }

    @GetMapping("/{user_id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Hisse> getHisse(@PathVariable long user_id) {
        Hisse hisse = hisseService.getHisse(user_id);
        if (hisse != null) {
            return ResponseEntity.ok(hisse);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
