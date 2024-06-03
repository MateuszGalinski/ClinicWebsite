package pl.dmcs.springbootjsp_iwa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.springbootjsp_iwa.message.response.DoctorResponse;
import pl.dmcs.springbootjsp_iwa.message.response.DoctorVisitResponse;
import pl.dmcs.springbootjsp_iwa.message.response.ResponseMessage;
import pl.dmcs.springbootjsp_iwa.message.response.VisitResponse;
import pl.dmcs.springbootjsp_iwa.model.Doctor;
import pl.dmcs.springbootjsp_iwa.model.Prescription;
import pl.dmcs.springbootjsp_iwa.model.Visit;
import pl.dmcs.springbootjsp_iwa.repository.DoctorRepository;
import pl.dmcs.springbootjsp_iwa.repository.PrescriptionRepository;
import pl.dmcs.springbootjsp_iwa.repository.VisitRepository;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/doctor")
public class DoctorController {

    DoctorRepository doctorRepository;
    VisitRepository visitRepository;
    PrescriptionRepository prescriptionRepository;
    @Autowired
    public DoctorController(DoctorRepository doctorRepository, VisitRepository visitRepository,
                            PrescriptionRepository prescriptionRepository){
        this.doctorRepository = doctorRepository;
        this.visitRepository = visitRepository;
        this.prescriptionRepository = prescriptionRepository;
    }

    @GetMapping
    ResponseEntity<List<DoctorResponse>> getAllDoctors(){
        List<Doctor> doctors = doctorRepository.findAll();
        if(!doctors.isEmpty()){
            List<DoctorResponse> doctorsResponse = new ArrayList<DoctorResponse>();

            doctors.forEach(doctor -> {
                doctorsResponse.add(new DoctorResponse(doctor));
            });

            return new ResponseEntity<List<DoctorResponse>>(doctorsResponse, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/get-taken-hours/{doctorID}/date/{date}")
    ResponseEntity<?> getTakenHours(@PathVariable long doctorID, @PathVariable @DateTimeFormat(pattern = "dd-MM-yyyy") Date date){
        Optional<Doctor> doctor = doctorRepository.findById(doctorID);

        if(!doctor.isPresent()){
            return new ResponseEntity<>(new ResponseMessage("Fail -> doctor not found"), HttpStatus.NOT_FOUND);
        }

        HashSet<Integer> hoursList = new HashSet<Integer>();



        doctor.get().getVisitList().forEach(visit -> {
            if(visit.getDate().compareTo(date) == 0) {
                hoursList.add(visit.getHour());
            }
        });

        return new ResponseEntity<>(hoursList, HttpStatus.OK);
    }

    @GetMapping("/by-username")
    ResponseEntity<?> getDoctorByUsername(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Doctor doctor = doctorRepository.findByUserUsername(username);

        if(doctor != null){
            return new ResponseEntity<Doctor>(doctor, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @GetMapping("doctors-visits")
    ResponseEntity<?> getDoctorsVisits(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Doctor doctor = doctorRepository.findByUserUsername(username);

        if(doctor == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<DoctorVisitResponse> visits = new ArrayList<DoctorVisitResponse>();

        doctor.getVisitList().forEach(visit -> {
            visits.add(new DoctorVisitResponse(visit));
        });

        return new ResponseEntity<List<DoctorVisitResponse>>(visits, HttpStatus.OK);
    }

    @PostMapping("add-prescription/{visitID}")
    ResponseEntity<?> addPrescriptionById(@PathVariable long visitID, @RequestBody Prescription prescription){
        Optional<Visit> visit = visitRepository.findById(visitID);

        if(!visit.isPresent()){
            return new ResponseEntity<>(new ResponseMessage("Fail -> visit not found"), HttpStatus.NOT_FOUND);
        }

        prescription.setVisit(visit.get());
        visit.get().setPrescription(prescription);


        prescriptionRepository.save(prescription);
        visitRepository.save(visit.get());

        return new ResponseEntity<>(visit, HttpStatus.OK);
    }


}
