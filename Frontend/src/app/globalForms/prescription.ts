export class Prescription {
  id: number;
  prescriptionContent: string;
  expirationDate: Date;
  prescriptionCode: number;

  constructor(id: number, prescriptionContent: string, expirationDate: Date, prescriptionCode: number) {
    this.id = id;
    this.prescriptionContent = prescriptionContent;
    this.expirationDate = expirationDate;
    this.prescriptionCode = prescriptionCode;
  }
}
