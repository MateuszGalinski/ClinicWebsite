import { Prescription } from './prescription';
export class VisitDoctor {
  id: bigint;
  date: Date;
  hour: number;
  prescription: Prescription | null;
  patientName: string;
  patientSurname: string;

  constructor(id: bigint, hour: number, date: Date, patientName: string, patientSurname: string, prescription: Prescription) {
    this.id = id;
    this.hour = hour;
    this.date = date;
    this.prescription = prescription;
    this.patientName = patientName;
    this.patientSurname = patientSurname;
  }
}
