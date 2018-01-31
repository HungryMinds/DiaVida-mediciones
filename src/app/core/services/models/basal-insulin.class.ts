export class BasalInsulin {
  dosage: number;
  timestamp: Date;

  constructor(biR: any) {
    this.dosage = biR.dosage;
    this.timestamp = new Date(biR.timestamp);
  }
}
