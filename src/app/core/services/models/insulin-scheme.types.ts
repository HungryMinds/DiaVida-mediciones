import { InsulinIntervals } from './insulin-intervals.enum';

class InsulinScheme {
  foodTime: string;
  quantity: number;

  constructor(inShIntRw: any) {
    this.foodTime = inShIntRw.foodTime;
    this.quantity = inShIntRw.quantity;
  }
}

export class InsulinSchemeInterval {
  comment: string;
  scheme: InsulinScheme;

  constructor(inShIntRw: any) {
    this.scheme = inShIntRw.scheme.map((scheme) => {
      return new InsulinScheme(scheme);
    });
    this.comment = inShIntRw.comment;
  }
}

export class InsulinSchemeRatio {
  comment: string;
  scheme: InsulinScheme[];
  fC: number;

  constructor(iSRRw: any) {
    this.scheme = iSRRw.scheme.map(sch => new InsulinScheme(sch));
    this.fC = iSRRw.fC;
    this.comment = iSRRw.comment;
  }
}
