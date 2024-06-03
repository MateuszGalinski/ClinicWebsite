package pl.dmcs.springbootjsp_iwa.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Date;

@Entity
public class Prescription {
    @Id
    @GeneratedValue
    private long id;

    private String prescriptionContent;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date expirationDate;

    private long prescriptionCode;
    @OneToOne()
    @JsonIgnore
    private Visit visit;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPrescriptionContent() {
        return prescriptionContent;
    }

    public void setPrescriptionContent(String prescriptionContent) {
        this.prescriptionContent = prescriptionContent;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    public long getPrescriptionCode() {
        return prescriptionCode;
    }

    public void setPrescriptionCode(long prescriptionCode) {
        this.prescriptionCode = prescriptionCode;
    }

    public Visit getVisit() {
        return visit;
    }

    public void setVisit(Visit visit) {
        this.visit = visit;
    }
}
