import { InsulinIntervals } from './insulin-intervals.enum';
import { FoodTime } from './food.types';

export interface InsulinSchemeIntervals {
  foodTime: FoodTime;
  scheme: InsulinIntervals;
  quantity: number;
}

export interface InsulinSchemeRatio {
  minimium: number;
  maximium: number;
}
