import {Component, OnInit} from '@angular/core';
import {DoctorService} from "../services/doctor.service";
import {Doctor} from "../globalForms/doctor";
import {formatDate} from "@angular/common";
import {PatientService} from "../services/patient.service";
import {BookingVisitForm} from "../globalForms/bookingVisitForm";

@Component({
  selector: 'app-bookvisit',
  templateUrl: './bookvisit.component.html',
  styleUrls: ['./bookvisit.component.css']
})
export class BookvisitComponent implements OnInit{
  minDate: Date;
  maxDate: Date;
  selected: Date | null = null;
  selectedHour: number | null = null;
  selectedDoctor: Doctor | null = null;
  doctors: Doctor[] = [];
  hours: number[] = Array.from({ length: 8 }, (_, i) => i + 8); // [8, 9, 10, 11, 12, 13, 14, 15]
  unavailableHours: number[] = [];

  ngOnInit() {
    this.doctorService.getDoctorsList().subscribe({
      next: (data : Doctor[]) => {
        this.doctors = data;
      }
    })


  }

  constructor(private doctorService : DoctorService, private patientService : PatientService) {
    this.updateUnavailableHours();
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    this.minDate = new Date(currentYear, currentMonth, currentDate + 1);
    this.maxDate = new Date(currentYear, currentMonth, currentDate + 31);
  }

  formatDate(date: Date | null) {
    if(date === null){
      return "";
    }
    const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with leading zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month and pad with leading zero if necessary
    const year = date.getFullYear(); // Get the full year

    return `${day}-${month}-${year}`;
  }

  onDateChange() {
    this.updateUnavailableHours();
    this.selectedHour = null;
  }

  onDoctorChange(){
    this.updateUnavailableHours();
    this.selectedHour = null;
  }

  updateUnavailableHours() {
    if (this.selected && this.selectedDoctor) {
      this.doctorService.getDoctorsHourWithDate(this.selectedDoctor.id, this.formatDate(this.selected)).subscribe({
        next: (data: number[]) => {
          console.log(data);
          this.unavailableHours = data;
        }
      })
    }
  }

  onBookVisit(){
    console.log(`This is date ${this.selectedDoctor?.id}`);
    if (this.selectedHour != null && this.selectedDoctor != null) {
      if(this.selectedDoctor.id != null) {
        this.patientService.bookVisit(new BookingVisitForm(this.formatDate(this.selected), this.selectedHour, this.selectedDoctor.id)).subscribe({
          next: (data) => {
            console.log("Visit booked successfully:", data);
            this.selected = null;
            this.selectedDoctor = null;
            this.selectedHour = null;
          },
          error: (data) => {
            console.log("error uploading a visit");
          }

        });
        this.updateUnavailableHours();
      }
    }
  }
}
