package pl.dmcs.springbootjsp_iwa.message.request;

import org.springframework.format.annotation.DateTimeFormat;
import pl.dmcs.springbootjsp_iwa.model.Doctor;
import pl.dmcs.springbootjsp_iwa.model.Patient;

import java.sql.Date;

public class BookingVisitForm {
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    Date date;

    int hour;

    long doctorID;


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

    public long getDoctorID() {
        return doctorID;
    }

    public void setDoctorID(long doctorID) {
        this.doctorID = doctorID;
    }
}
