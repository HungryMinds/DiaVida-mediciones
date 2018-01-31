import {
  InsulinSchemeInterval,
  InsulinSchemeRatio
} from './insulin-scheme.types';
import { BasalInsulin } from './basal-insulin.class';
import { FoodTable } from './food.types';

export class Campist {
  id: string;
  names: string;
  lastNames: string;
  age: number;
  team: string;
  allergies: string;
  medications: string;
  insulinSchemeInterval: InsulinSchemeInterval;
  insulinSchemeRatio: InsulinSchemeRatio;
  basalInsulin: BasalInsulin[];
  foodTable: FoodTable[];

  constructor(campRO: any) {
    this.id = campRO.id;
    this.names = campRO.names;
    this.lastNames = campRO.lastNames;
    this.age = campRO.age;
    this.team = campRO.team;
    this.allergies = campRO.allergies;
    this.medications = campRO.medications;
    this.insulinSchemeInterval = new InsulinSchemeInterval(
      campRO.insulinSchemeInterval
    );
    this.insulinSchemeRatio = new InsulinSchemeRatio(campRO.insulinSchemeRatio);
    this.basalInsulin = campRO.basalInsulin.map(
      basal => new BasalInsulin(basal)
    );
    this.foodTable = campRO.foodTable.map(ft => new FoodTable(ft));
  }
}
