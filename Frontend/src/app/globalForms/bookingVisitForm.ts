export class BookingVisitForm {
  date: string; // Assuming the date is sent as a string in "dd-MM-yyyy" format
  hour: number;
  doctorID: bigint;

  constructor(date: string, hour: number, doctorID: bigint) {
    this.doctorID = doctorID;
    this.date = date;
    this.hour = hour;
  }
}
