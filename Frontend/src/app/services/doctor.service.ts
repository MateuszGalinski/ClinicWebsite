import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Prescription} from "../globalForms/prescription";
import {PrescriptionRequestForm} from "../globalForms/prescriptionRequestForm";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private baseDoctorUrl = "http://127.0.0.1:8080/doctor"
  private baseAdminUrl = "http://127.0.0.1:8080/admin"
  private getDoctorsHoursUrl = "http://127.0.0.1:8080/doctor/get-taken-hours/{doctorID}/date/{date}"
  constructor(private http: HttpClient) { }

  getDoctorsList(): Observable<any> {
    return this.http.get(this.baseDoctorUrl);
  }

  deleteDoctor(doctorID: bigint): Observable<any> {
    return this.http.delete(`${this.baseAdminUrl}/delete-doctor/${doctorID}`)
  }

  getDoctorsVisits(): Observable<any> {
    return  this.http.get(`${this.baseDoctorUrl}/doctors-visits`);
  }

  getDoctorsHourWithDate(doctorID: bigint, date: String): Observable<any> {
    return this.http.get(`${this.baseDoctorUrl}/get-taken-hours/${doctorID}/date/${date}`);
  }

  addPrescriptions(prescription: PrescriptionRequestForm, visitID: bigint): Observable<any> {
    return this.http.post(`${this.baseDoctorUrl}/add-prescription/${visitID}`, prescription);
  }
}
