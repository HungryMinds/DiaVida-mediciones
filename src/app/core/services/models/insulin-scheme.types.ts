import { InsulinIntervals } from './insulin-intervals.enum';
import { FoodTime, FoodType } from './food.types';

export class InsulinScheme {
  foodTime: string;
  quantity: number;

  constructor(inShIntRw: any) {
    this.foodTime = FoodTime[inShIntRw.foodTime];
    this.quantity = inShIntRw.quantity;
  }
}

export class InsulinSchemeInterval extends InsulinScheme {
  scheme: string;

  constructor(inShIntRw: any) {
    super(inShIntRw);

    this.scheme = InsulinIntervals[inShIntRw.scheme];
  }
}

export class InsulinSchemeRatio {
  scheme: InsulinScheme[];
  fC: number;

  constructor(iSRRw: any) {
    this.scheme = iSRRw.scheme.map(sch => new InsulinScheme(sch));
    this.fC = iSRRw.fC;
  }
}
