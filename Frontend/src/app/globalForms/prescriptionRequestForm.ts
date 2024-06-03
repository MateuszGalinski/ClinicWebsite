export class PrescriptionRequestForm {
  prescriptionContent: string;
  expirationDate: String;  // assuming date is in string format
  prescriptionCode: number;

  constructor(prescriptionContent: string, expirationDate: String, prescriptionCode: number) {
    this.prescriptionContent = prescriptionContent;
    this.expirationDate = expirationDate;
    this.prescriptionCode = prescriptionCode;
  }
}
