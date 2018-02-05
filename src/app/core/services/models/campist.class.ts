import {
  InsulinSchemeInterval,
  InsulinSchemeRatio
} from './insulin-scheme.types';
import { BasalInsulin } from './basal-insulin.class';
import { FoodTable } from './food.class';

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

/*
const campist = {
  id: '[id en caso de edicion]',
  names: '[nombres]',
  lastNames: '[apellidos]',
  age: '[edad]',
  team: '[grupo]',
  allergies: '[texto]',
  medications: '[texto]',
  insulinSchemeInterval: {
    comment: '[texto]',
    scheme: [
      {
        foodTime:
          '[string del tiempo de comida en ingles (Breakfast) como se ve en el enum]',
        quantity: '[numero]'
      }
    ]
  },
  insulinSchemeRatio: {
    scheme: [
      {
        foodTime: '[Breakfast, ...etc]',
        quantity: '[numero]'
      }
    ],
    fC: '[numero]',
    comment: '[string]'
  },
  basalInsulin: [
    {
      dosage: '[number]',
      timestamp: '[hour]'
    }
  ],
  foodTable: [
    {
      foodTime: '[breakfast...etc]',
      foodType: '[proteins, dairy, etc]'
    }
  ]
};
*/
