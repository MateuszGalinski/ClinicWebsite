import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import { Router } from "@angular/router"
import {PatientService} from "../services/patient.service";
import {Visit} from "../globalForms/visit";
import {Prescription} from "../globalForms/prescription";
import {DoctorService} from "../services/doctor.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  info: any;
  numberOfVisits: number = 0;
  numberOfPrescriptions: number = 0;
  numberOfPrescriptionsToFill: number = 0;

  constructor(private token: TokenStorageService, private router: Router,
              private patientService: PatientService, private doctorService: DoctorService) { }

  private countFutureVisits(visits: Visit[]): number {
    const now = new Date();
    let count = 0;
    visits.forEach(visit => {
      const visitDate = new Date(visit.date);
      visitDate.setHours(visit.hour);
      if (visitDate > now) {
        count++;
      }
    });
    return count;
  }

  private countNonExpiredPrescriptions(prescriptions: Prescription[]): number {
    const now = new Date();
    let count = 0;
    prescriptions.forEach(prescription  => {
      const prescriptionExpDate = new Date(prescription.expirationDate);

      if (prescriptionExpDate > now) {
        count++;
      }
    });
    return count;
  }

  private countVisitsRequiringPrescription(visits: Visit[]): number {
    const now = new Date();
    let count = 0;
    visits.forEach(visit => {
      const visitDate = new Date(visit.date);
      visitDate.setHours(visit.hour);
      if (visitDate <= now && !visit.prescription) {
        count++;
      }
    });
    return count;
  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

    if(this.isUser()){
      this.patientInit();
    }

    if(this.isDoctor()){
      this.doctorInit();
    }
  }

  listRole() : String {
    if (this.info.authorities.includes("ROLE_ADMIN")) {
      return "Admin"
    } else if(this.info.authorities.includes("ROLE_DOCTOR")){
      return "Doctor"
    } else {
      return "Patient"
    }
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

  redirectTo(page: String){
    this.router.navigate([`${page}`]);
  }

  isUser() : boolean {
    if (this.info.authorities.length === 1){
      if (this.info.authorities[0] === "ROLE_USER"){
        return true;
      }
    }

    return false;
  }

  isDoctor() : boolean {
    if (this.info.authorities.length === 1){
      if (this.info.authorities[0] === "ROLE_DOCTOR"){
        return true;
      }
    }

    return false;
  }

  patientInit() : void{
    this.patientService.getUserVisits().subscribe({
      next: (data: Visit[]) => {
        this.numberOfVisits = this.countFutureVisits(data);
      },
      error: (data) => {

      }
    });

    this.patientService.getUserPrescriptions().subscribe({
      next: (data: Prescription[]) => {
        this.numberOfPrescriptions = this.countNonExpiredPrescriptions(data);
      }
    })
  }

  doctorInit() : void{
    this.doctorService.getDoctorsVisits().subscribe({
      next: (data: Visit[]) => {
        this.numberOfVisits = this.countFutureVisits(data);
        this.numberOfPrescriptionsToFill = this.countVisitsRequiringPrescription(data);
      },
      error: (data) => {

      }
    });

    // this.patientService.getUserPrescriptions().subscribe({
    //   next: (data: Prescription[]) => {
    //     this.numberOfPrescriptions = this.countNonExpiredPrescriptions(data);
    //   }
    // })
  }
}
