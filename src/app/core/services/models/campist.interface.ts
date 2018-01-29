import { Team } from './team.enum';
import {
  InsulinSchemeIntervals,
  InsulinSchemeRatio
} from './insulin-scheme.interface';
import { BasalInsulin } from './basal-insulin.interface';
import { FoodTable } from './food.types';

export interface Campist {
  id: string;
  names: string;
  lastNames: string;
  age: number;
  team: Team;
  allergies: string;
  medications: string;
  insulinSchemeIntervals: InsulinSchemeIntervals;
  insulinSchemeRatio: InsulinSchemeRatio;
  basalInsulin: Array<BasalInsulin>;
  foodTable: Array<FoodTable>;
}
