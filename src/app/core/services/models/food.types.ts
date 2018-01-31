export enum FoodTime {
  Breakfast = 'Desayuno',
  MorningSnack = 'Merienda mañana',
  Lunch = 'Almuerzo',
  AfternoonSnack = 'Merienda tarde',
  Dinner = 'Cena',
  BeforeSleep = 'Antes de dormir'
}

export enum FoodType {
  carbs = 'Carbohidratos',
  proteins = 'Proteínas',
  fruits = 'Frutas',
  dairy = 'Leche'
}

export class FoodTable {
  foodTime: string;
  foodType: string;

  constructor(fdRw: any) {
    this.foodTime = FoodTime[fdRw.foodTime];
    this.foodType = FoodType[fdRw.foodType];
  }
}
