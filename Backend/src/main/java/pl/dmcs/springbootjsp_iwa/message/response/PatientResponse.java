package pl.dmcs.springbootjsp_iwa.message.response;

import pl.dmcs.springbootjsp_iwa.model.Patient;

public class PatientResponse {
    private long id;
    private String name;
    private String surname;

    private String telephone;

    public PatientResponse(Patient patient){
        this.id = patient.getId();
        this.name = patient.getName();
        this.surname = patient.getSurname();
        this.telephone = patient.getTelephone();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }
}
