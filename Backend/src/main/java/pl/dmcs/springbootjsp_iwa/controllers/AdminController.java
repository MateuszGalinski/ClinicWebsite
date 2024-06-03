package pl.dmcs.springbootjsp_iwa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.springbootjsp_iwa.message.response.ResponseMessage;
import pl.dmcs.springbootjsp_iwa.model.Doctor;
import pl.dmcs.springbootjsp_iwa.repository.DoctorRepository;
import pl.dmcs.springbootjsp_iwa.repository.PrescriptionRepository;
import pl.dmcs.springbootjsp_iwa.repository.UserRepository;
import pl.dmcs.springbootjsp_iwa.repository.VisitRepository;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/admin")
public class AdminController {

    DoctorRepository doctorRepository;
    UserRepository userRepository;
    @Autowired
    public AdminController(DoctorRepository doctorRepository){
        this.doctorRepository = doctorRepository;
    }

    @DeleteMapping("/delete-doctor/{id}")
    ResponseEntity<?> deleteDoctor(@PathVariable long id){
        Optional<Doctor> doctor = doctorRepository.findById(id);
        if(!doctor.isPresent()){
            return new ResponseEntity<>(new ResponseMessage("Fail -> Doctor not found"), HttpStatus.NOT_FOUND);
        }

        doctorRepository.delete(doctor.get());

        return new ResponseEntity<>(doctor, HttpStatus.OK);
    }
}
