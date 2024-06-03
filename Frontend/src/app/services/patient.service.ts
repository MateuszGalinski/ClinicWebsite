import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookingVisitForm} from "../globalForms/bookingVisitForm";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientBaseUrl = "http://127.0.0.1:8080/patient";
  private bookingUrl = "http://127.0.0.1:8080/patient/book-visit";
  private getPatientsVisitsUrl = "http://127.0.0.1:8080/patient/visits"
  private getPatientsPrescriptionsUrl = "http://127.0.0.1:8080/patient/prescriptions"

  constructor(private http: HttpClient) { }

  getUserVisits(): Observable<any> {
    return this.http.get(this.getPatientsVisitsUrl);
  }

  getUserPrescriptions(): Observable<any> {
    return this.http.get(this.getPatientsPrescriptionsUrl);
  }

  bookVisit(bookingForm : BookingVisitForm): Observable<any> {
    return this.http.post(this.bookingUrl, bookingForm);
  }

  cancelVisit(id:bigint): Observable<any>{
    return this.http.delete(`${this.patientBaseUrl}/cancel-visit/${id}`);
  }

}
