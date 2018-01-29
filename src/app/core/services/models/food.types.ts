export enum FoodTime {
  Breakfast = 'Desayuno',
  MorningSnack = 'Merienda Mañana',
  Lunch = 'Almuerzo',
  AfternoonSnack = 'Merienda Tarde',
  Dinner = 'Cena'
}

export enum FoodType {
  carbs= 'Carbohidratos',
  proteins= 'Proteínas',
  fruits= 'Frutas',
  dairy= 'Leche'
}

export interface FoodTable {
  foodTime: FoodTime;
  foodType: FoodType;
}
