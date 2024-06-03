package pl.dmcs.springbootjsp_iwa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.dmcs.springbootjsp_iwa.message.response.VisitResponse;
import pl.dmcs.springbootjsp_iwa.model.Visit;
import pl.dmcs.springbootjsp_iwa.repository.VisitRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/visit")
public class VisitController {
    VisitRepository visitRepository;

    @Autowired
    VisitController(VisitRepository visitRepository){
        this.visitRepository = visitRepository;
    }

    @GetMapping
    ResponseEntity<?> getAllVisit(){
        List<VisitResponse> visits = new ArrayList<VisitResponse>();
        visitRepository.findAll().forEach(visit -> {
            visits.add(new VisitResponse(visit));
        });

        return new ResponseEntity<>(visits, HttpStatus.OK);
    }
}
