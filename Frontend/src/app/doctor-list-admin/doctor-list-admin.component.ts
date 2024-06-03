import {Component, OnInit} from '@angular/core';
import {Doctor} from "../globalForms/doctor";
import {DoctorService} from "../services/doctor.service";

@Component({
  selector: 'app-doctor-list-admin',
  templateUrl: './doctor-list-admin.component.html',
  styleUrls: ['./doctor-list-admin.component.css']
})
export class DoctorListAdminComponent implements OnInit{

  doctorsList : Doctor[] = [];
  filteredDoctorsList : Doctor[] = []

  constructor(private doctorService: DoctorService) {
  }
  ngOnInit() {
    this.doctorService.getDoctorsList().subscribe({
      next:(data) => {
        this.doctorsList = data;
      }
    })
  }

  deleteDoctor(doctorID : bigint) {
    this.doctorService.deleteDoctor(doctorID).subscribe({
      next: (data) => {
        this.doctorsList = this.doctorsList.filter(item => item.id !== data.id);
      },
      error: (data) => {
        alert("Error when deleting doctor");
      }
    });
  }
}
