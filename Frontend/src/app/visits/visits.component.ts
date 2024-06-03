import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../services/patient.service';
import { Visit } from '../globalForms/visit';

enum Filter {
  All,
  Future,
  Past,
}

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {
  Filter = Filter;
  currentFilter: Filter = Filter.All;
  visitList: Visit[] = [];
  filteredVisitList: Visit[] = [];

  constructor(private router: Router, private patientService: PatientService) { }

  ngOnInit() {
    this.patientService.getUserVisits().subscribe({
      next: (data: Visit[]) => {
        this.visitList = data;
        this.filterVisits();
      },
      error: (data) => {

      }
    });
  }

  setFilter(filter: Filter) {
    this.currentFilter = filter;
    this.filterVisits();
  }

  filterVisits() {
    const now = new Date();
    this.filteredVisitList = this.visitList.filter(visit => {
      const visitDate = new Date(visit.date);
      //visitDate.setHours(visit.hour);
      if (this.currentFilter === Filter.All) {
        return true;
      } else if (this.currentFilter === Filter.Future) {
        return visitDate > now;
      } else if (this.currentFilter === Filter.Past) {
        return visitDate < now;
      }
      return false;
    });

    this.filteredVisitList.sort((a, b) => {
      const dateA = new Date(a.date);
      dateA.setHours(a.hour);
      const dateB = new Date(b.date);
      dateB.setHours(b.hour)
      return dateB.getTime() - dateA.getTime();
    });
  }

  isFutureVisit(visit: Visit){
    const now = new Date();
    const visitDate = new Date(visit.date);

    return visitDate > now;
  }

  redirectTo(page: string) {
    this.router.navigate([`${page}`]);
  }

  cancelVisit(id: bigint) {
    this.patientService.cancelVisit(id).subscribe({
      next: (data : Visit) => {
        console.log(data);
        this.visitList = this.visitList.filter(item => item.id !== data.id);
        this.filterVisits();
      }
    })
  }
}
