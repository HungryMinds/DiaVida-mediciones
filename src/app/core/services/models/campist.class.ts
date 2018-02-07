const TESTOBJ = {
  names: 'Actulizado',
  lastNames: 'Reciente',
  age: 22,
  team: 'Morado',
  allergies: 'test',
  medications: 'test',
  weight: 10, 

  foodTable: {
    fruta: {
      Breakfast: 10,
      MorningSnack: 10,
      Lunch: 10,
      AfternoonSnack: 10,
      Diner: 10,
      BeforeSleep: 10
    },
    lac: {
      Breakfast: 10,
      MorningSnack: 10,
      Lunch: 10,
      AfternoonSnack: 10,
      Diner: 10,
      BeforeSleep: 10
    },
    carb: {
      Breakfast: 10,
      MorningSnack: 10,
      Lunch: 10,
      AfternoonSnack: 10,
      Diner: 10,
      BeforeSleep: 10
    },
    prot: {
      Breakfast: 10,
      MorningSnack: 10,
      Lunch: 10,
      AfternoonSnack: 10,
      Diner: 10,
      BeforeSleep: 10
    }
  },

  basalInsulin: {
    // This value cold be null
    'first-application': {
      doses: '10',
      date: '2018-02-06T01:30:00.000Z'
    },
    // This value cold be null
    'second-application': {
      doses: '10',
      date: '2018-02-06T01:30:00.000Z'
    }
  },

  insulinSchemeRatio: {
    Breakfast: 10,
    Lunch: 10,
    Diner: 10,
    correctionFactor: '',
    comment: ''
  },

  insulinSchemeInterval: {
    comment: 'Coment Test',

    '<80': {
      Breakfast: 10,
      Lunch: 10,
      Diner: 10
    },
    '81-160': {
      Breakfast: 10,
      Lunch: 10,
      Diner: 10
    },
    '161-250': {
      Breakfast: 10,
      Lunch: 10,
      Diner: 10
    },
    '>250': {
      Breakfast: 10,
      Lunch: 10,
      Diner: 10
    }
  }
};

export class Campist {
  id: string;
  names: string;
  lastNames: string;
  age: number;
  team: string;
  allergies: string;
  medications: string;
  insulinSchemeInterval: any;
  insulinSchemeRatio: any;
  basalInsulin: any;
  foodTable: any;

  constructor(campRO: any) {
    this.names = campRO.names;
    this.lastNames = campRO.lastNames;
    this.age = campRO.age;
    this.team = campRO.team;
    this.allergies = campRO.allergies;
    this.medications = campRO.medications;
    this.insulinSchemeInterval = campRO.insulinSchemeInterval;
    this.insulinSchemeRatio = campRO.insulinSchemeRatio;
    this.basalInsulin = campRO.basalInsulin;
    this.foodTable = campRO.foodTable;
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
