package pl.dmcs.springbootjsp_iwa.message.response;

import org.springframework.format.annotation.DateTimeFormat;
import pl.dmcs.springbootjsp_iwa.model.Prescription;
import pl.dmcs.springbootjsp_iwa.model.Visit;

import java.sql.Date;

public class DoctorVisitResponse {
    private long id;

    private int hour;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date date;

    private Prescription prescription;

    private String patientName;
    private String patientSurname;

    public DoctorVisitResponse(){

    }

    public DoctorVisitResponse(Visit visit){
        this.id = visit.getId();
        this.hour = visit.getHour();
        this.date = visit.getDate();
        this.prescription = visit.getPrescription();
        this.patientName = visit.getPatient().getName();
        this.patientSurname = visit.getPatient().getSurname();
    }

    public DoctorVisitResponse(long id, int hour, Date date){
        this.id = id;
        this.hour = hour;
        this.date = date;
        this.prescription = null;
    }

    public DoctorVisitResponse(long id, int hour, Date date, Prescription prescription){
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

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getPatientSurname() {
        return patientSurname;
    }

    public void setPatientSurname(String patientSurname) {
        this.patientSurname = patientSurname;
    }
}
