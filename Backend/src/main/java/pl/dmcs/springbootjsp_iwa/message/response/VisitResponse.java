package pl.dmcs.springbootjsp_iwa.message.response;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.format.annotation.DateTimeFormat;
import pl.dmcs.springbootjsp_iwa.model.Doctor;
import pl.dmcs.springbootjsp_iwa.model.Patient;
import pl.dmcs.springbootjsp_iwa.model.Prescription;
import pl.dmcs.springbootjsp_iwa.model.Visit;

import java.sql.Date;

public class VisitResponse {
    private long id;

    private int hour;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date date;

    private Prescription prescription;

    private String doctorName;
    private String doctorSurname;

    public VisitResponse(){

    }

    public VisitResponse(Visit visit){
        this.id = visit.getId();
        this.hour = visit.getHour();
        this.date = visit.getDate();
        this.prescription = visit.getPrescription();
        this.doctorName = visit.getDoctor().getName();
        this.doctorSurname = visit.getDoctor().getSurname();
    }

    public VisitResponse(long id, int hour, Date date){
        this.id = id;
        this.hour = hour;
        this.date = date;
        this.prescription = null;
    }

    public VisitResponse(long id, int hour, Date date, Prescription prescription){
        this.id = id;
        this.hour = hour;
        this.date = date;
        this.prescription = prescription;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getHour() {
        return hour;
    }

    public void setHour(int hour) {
        this.hour = hour;
    }

    public Prescription getPrescription() {
        return prescription;
    }

    public void setPrescription(Prescription prescription) {
        this.prescription = prescription;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getDoctorSurname() {
        return doctorSurname;
    }

    public void setDoctorSurname(String doctorSurname) {
        this.doctorSurname = doctorSurname;
    }
}
