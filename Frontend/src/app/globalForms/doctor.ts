export class Doctor {
  id: bigint;
  doctorName: string;
  doctorSurname: string;

  constructor(id: bigint, doctorName: string, doctorSurname: string) {
    this.id = id;
    this.doctorName = doctorName;
    this.doctorSurname = doctorSurname;
  }
}
