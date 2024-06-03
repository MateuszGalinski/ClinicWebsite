package pl.dmcs.springbootjsp_iwa.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Date;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Visit {
    @Id
    @GeneratedValue
    private long id;

    @Min(value=8, message="must be equal or greater than 8")
    @Max(value=15, message="must be equal or less than 15")
    private int hour;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date date;

    @OneToOne(mappedBy = "visit",cascade = CascadeType.ALL)
    private Prescription prescription;

    @ManyToOne
    private Doctor doctor;

    @ManyToOne
    private Patient patient;

    public Visit(){}

    public Visit(int hour, Date date, Patient patient, Doctor doctor){
        this.hour = hour;
        this.date = date;
        this.patient = patient;
        this.doctor = doctor;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getHour() {
        return hour;
    }

    public void setHour(int hour) {
        this.hour = hour;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Prescription getPrescription() {
        return prescription;
    }

    public void setPrescription(Prescription prescription) {
        this.prescription = prescription;
    }

}
