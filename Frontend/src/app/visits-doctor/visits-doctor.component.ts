import { Component, OnInit } from '@angular/core';
import { VisitDoctor } from "../globalForms/visitDoctor";
import { Router } from "@angular/router";
import { DoctorService } from "../services/doctor.service";
import { PrescriptionRequestForm } from "../globalForms/prescriptionRequestForm";
import { Prescription } from "../globalForms/prescription";

enum Filter {
  All,
  Future,
  Past,
}

@Component({
  selector: 'app-visits-doctor',
  templateUrl: './visits-doctor.component.html',
  styleUrls: ['./visits-doctor.component.css']
})
export class VisitsDoctorComponent implements OnInit {
  Filter = Filter;
  currentFilter: Filter = Filter.All;
  visitList: VisitDoctor[] = [];
  filteredVisitList: VisitDoctor[] = [];
  visitTextMap: { [key: string]: string } = {};
  patientSearchQuery: string = '';

  constructor(private router: Router, private doctorService: DoctorService) { }

  ngOnInit() {
    this.doctorService.getDoctorsVisits().subscribe({
      next: (data: VisitDoctor[]) => {
        this.visitList = data;
        this.filterVisits();
      },
      error: (data) => {
        this.visitList = [];
      }
    });
  }

  stringToHash(stringToHash:string) {
    let hash = 0;

    if (stringToHash.length === 0) return hash;

    for (const char of stringToHash) {
      hash ^= char.charCodeAt(0); // Bitwise XOR operation
    }

    return hash;
  }

  formatDate(date: Date | null) {
    if (date === null) {
      return "";
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  setFilter(filter: Filter) {
    this.currentFilter = filter;
    this.filterVisits();
  }

  filterVisits() {
    const now = new Date();
    this.filteredVisitList = this.visitList.filter(visit => {
      const visitDate = new Date(visit.date);
      if (this.currentFilter === Filter.All) {
        return true;
      } else if (this.currentFilter === Filter.Future) {
        return visitDate > now;
      } else if (this.currentFilter === Filter.Past) {
        return visitDate < now;
      }
      return false;
    });

    if (this.patientSearchQuery.trim() !== '') {
      this.filteredVisitList = this.filteredVisitList.filter(visit =>
        (visit.patientName.toLowerCase().includes(this.patientSearchQuery.toLowerCase())) ||
        (visit.patientSurname.toLowerCase().includes(this.patientSearchQuery.toLowerCase()))
      );
    }

    this.filteredVisitList.sort((a, b) => {
      const dateA = new Date(a.date);
      dateA.setHours(a.hour);
      const dateB = new Date(b.date);
      dateB.setHours(b.hour);
      return dateB.getTime() - dateA.getTime();
    });
  }

  isFutureVisit(visit: VisitDoctor) {
    const now = new Date();
    const visitDate = new Date(visit.date);
    return visitDate > now;
  }

  redirectTo(page: string) {
    this.router.navigate([`${page}`]);
  }

  addPrescription(visit: VisitDoctor) {
    if (!this.visitTextMap[visit.id.toString()]) {
      alert('Please enter a prescription text.');
      return;
    }

    const expirationDate = this.formatDate(new Date(new Date().setDate(new Date().getDate() + 30)));
    const prescription = new PrescriptionRequestForm(
      this.visitTextMap[visit.id.toString()],
      expirationDate,
      this.stringToHash(this.visitTextMap[visit.id.toString()])
    );


    this.doctorService.addPrescriptions(prescription, visit.id).subscribe({
      next: (data) => {
        console.log(data);
        if (data && data.prescription) {
          visit.prescription = data.prescription;
        }
      },
      error: (error) => {
        console.error('Error adding prescription', error);
        alert('Error adding prescription.');
      }
    });
  }
}
