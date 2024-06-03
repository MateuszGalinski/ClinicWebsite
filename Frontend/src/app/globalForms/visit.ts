import { Prescription } from './prescription';
export class Visit {
  id: bigint;
  date: Date;
  hour: number;
  prescription: Prescription | null;
  doctorName: string;
  doctorSurname: string;

  constructor(id: bigint, hour: number, date: Date, doctorName: string, doctorSurname: string, prescription: Prescription) {
    this.id = id;
    this.hour = hour;
    this.date = date;
    this.prescription = prescription;
    this.doctorName = doctorName;
    this.doctorSurname = doctorSurname;
  }
}
