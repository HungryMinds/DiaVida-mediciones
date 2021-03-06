import { logType } from './log.enum';

class Log {
  idCampist: string;
  id: string; // id en firestore
  date: Date; // momento de la prueba
  description: string; // descripción que se agrega en caso de necesitarlo
  value: number; // resultado o cantidad en caso de prueba

  constructor(data: any) {
    this.date = data.date;
    this.description = data.description;
    this.value = data.value;
  }
}

export class LogMedition extends Log {
  logType = logType.measure;
  foodTime: string; // momento como desayuno, almuerzo, etc.

  constructor(logRaw: any) {
    super(logRaw);

    this.foodTime = logRaw.foodTime;
  }
}

/*
const logMedition = new LogMedition({
  foodTime: '[breakfast...]', // revisar el enum FoodTime en el archivo food.enum
  date: '[formato de fecha en el momento que se realizo la medicion]',
  description: '[descripción opcional]',
  value: '[valor numerico del resultado de la prueba]'
});
*/

export class LogInjection extends Log {
  logType = logType.inyetable;
  type: string;

  constructor(logRaw: any) {
    super(logRaw);

    this.type = logRaw.type;
  }
}

/*
const logInjection = new LogInjection({
  date: '[formato de fecha en el momento que se realizo la inyección]',
  description: '[descripción opcional]',
  value: '[valor numerico de la cantidad inyectada]',
  type: '[el tipo de insulina]' // consultar el archivo insulin-type.enum
});
*/

export class LogFood extends Log {
  logType = logType.food;
  type: string; // jugo, galleta, leche, etc.

  constructor(logRaw: any) {
    super(logRaw);

    this.type = logRaw.type;
  }
}

/*
const logFood = new LogFood({
  date: '[formato de fecha en el momento que se dió la comida]',
  description: '[descripción opcional]',
  value: '[valor numerico de carbos ingeridos]',
  type: '[el tipo de comida]' // consultar el archivo food.enum el enum Snack
});
*/
