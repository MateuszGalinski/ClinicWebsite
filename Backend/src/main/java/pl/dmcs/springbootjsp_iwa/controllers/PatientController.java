package pl.dmcs.springbootjsp_iwa.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.springbootjsp_iwa.message.request.BookingVisitForm;
import pl.dmcs.springbootjsp_iwa.message.response.PatientResponse;
import pl.dmcs.springbootjsp_iwa.message.response.PrescriptionResponse;
import pl.dmcs.springbootjsp_iwa.message.response.ResponseMessage;
import pl.dmcs.springbootjsp_iwa.message.response.VisitResponse;
import pl.dmcs.springbootjsp_iwa.model.Doctor;
import pl.dmcs.springbootjsp_iwa.model.Patient;
import pl.dmcs.springbootjsp_iwa.model.User;
import pl.dmcs.springbootjsp_iwa.model.Visit;
import pl.dmcs.springbootjsp_iwa.repository.DoctorRepository;
import pl.dmcs.springbootjsp_iwa.repository.PatientRepository;
import pl.dmcs.springbootjsp_iwa.repository.UserRepository;
import pl.dmcs.springbootjsp_iwa.repository.VisitRepository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/patient")
public class PatientController {

    private PatientRepository patientRepository;
    private UserRepository userRepository;
    private DoctorRepository doctorRepository;

    private VisitRepository visitRepository;

    @Autowired
    public PatientController(PatientRepository patientRepository, UserRepository userRepository,
                             DoctorRepository doctorRepository, VisitRepository visitRepository){
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.visitRepository = visitRepository;
    }

    @GetMapping
    public ResponseEntity<List<PatientResponse>> getAllPatients() {
        List<PatientResponse> patientsResponse = new ArrayList<PatientResponse>();

        patientRepository.findAll().forEach(patient -> {
            patientsResponse.add(new PatientResponse(patient));
        });

        return new ResponseEntity<List<PatientResponse>>(patientsResponse, HttpStatus.OK);
    }

    @GetMapping("/by-username")
    public ResponseEntity<Patient> getPatientByUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Patient patient = patientRepository.findByUserUsername(username);

        if (patient != null) {
            return new ResponseEntity<Patient>(patient, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/visits")
    public ResponseEntity<?> getPatientVisitsByUsername(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Patient patient = patientRepository.findByUserUsername(username);

        if (patient == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<VisitResponse> visitResponseList = new ArrayList<VisitResponse>();

        patient.getVisitList().forEach(visit -> {
            visitResponseList.add(new VisitResponse(visit));
        });



        return new ResponseEntity<List<VisitResponse>>(visitResponseList, HttpStatus.OK);
    }

    @GetMapping("prescriptions")
    public ResponseEntity<?> getPatientsPrescriptionsByUsername(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Patient patient = patientRepository.findByUserUsername(username);

        if (patient == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<PrescriptionResponse> prescriptionResponseList = new ArrayList<PrescriptionResponse>();

        patient.getVisitList().forEach(visit -> {
            if(visit.getPrescription() != null){
                prescriptionResponseList.add(new PrescriptionResponse(visit.getPrescription()));
            }
        });



        return new ResponseEntity<List<PrescriptionResponse>>(prescriptionResponseList, HttpStatus.OK);
    }

    @PostMapping("book-visit")
    public  ResponseEntity<?> bookVisit(@Valid @RequestBody BookingVisitForm bookingVisitForm) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Patient patient = patientRepository.findByUserUsername(username);

        if (patient == null) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> you are not a registered patient"), HttpStatus.NOT_FOUND);
        }

        Optional<Doctor> doctor = doctorRepository.findById(bookingVisitForm.getDoctorID());

        if(!doctor.isPresent()){
            return new ResponseEntity<>(new ResponseMessage("Fail -> doctor not found"), HttpStatus.NOT_FOUND);
        }

        Visit visit = new Visit(bookingVisitForm.getHour(), bookingVisitForm.getDate(), patient, doctor.get());
        doctor.get().addVisit(visit);
        patient.addVisit(visit);
        visitRepository.save(visit);
        doctorRepository.save(doctor.get());
        patientRepository.save(patient);


        return new ResponseEntity<>(visit, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deletePatientById(@PathVariable long id){
        Optional<Patient> patient = patientRepository.findById(id);

        if(patient.isPresent()){
            patientRepository.delete(patient.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/cancel-visit/{id}")
    ResponseEntity<?> deleteVisitById(@PathVariable long id){
        Optional<Visit> visit = visitRepository.findById(id);

        if(visit.isPresent()){
            visitRepository.delete(visit.get());
            return new ResponseEntity<>(visit, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
