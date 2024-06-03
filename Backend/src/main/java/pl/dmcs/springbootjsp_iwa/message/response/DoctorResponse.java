package pl.dmcs.springbootjsp_iwa.message.response;

import pl.dmcs.springbootjsp_iwa.model.Doctor;

public class DoctorResponse {
    private long id;
    private String doctorName;
    private String doctorSurname;

    public DoctorResponse(Doctor doctor){
        this.id = doctor.getId();
        this.doctorName = doctor.getName();
        this.doctorSurname = doctor.getSurname();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDoctorSurname() {
        return doctorSurname;
    }

    public void setDoctorSurname(String doctorSurname) {
        this.doctorSurname = doctorSurname;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }
}
