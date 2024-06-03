package pl.dmcs.springbootjsp_iwa.message.response;

import org.springframework.format.annotation.DateTimeFormat;
import pl.dmcs.springbootjsp_iwa.model.Prescription;

import java.sql.Date;

public class PrescriptionResponse {
    private long id;

    private String prescriptionContent;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date expirationDate;

    private long prescriptionCode;

    public PrescriptionResponse(Prescription prescription){
        this.id = prescription.getId();
        this.prescriptionCode = prescription.getPrescriptionCode();
        this.expirationDate = prescription.getExpirationDate();
        this.prescriptionContent = prescription.getPrescriptionContent();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getPrescriptionCode() {
        return prescriptionCode;
    }

    public void setPrescriptionCode(long prescriptionCode) {
        this.prescriptionCode = prescriptionCode;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getPrescriptionContent() {
        return prescriptionContent;
    }

    public void setPrescriptionContent(String prescriptionContent) {
        this.prescriptionContent = prescriptionContent;
    }
}
