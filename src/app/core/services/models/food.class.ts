import { FoodTime, FoodType } from './food.enum';

export class FoodTable {
  foodTime: string;
  foodType: string;

  constructor(fdRw: any) {
    this.foodTime = FoodTime[fdRw.foodTime];
    this.foodType = FoodType[fdRw.foodType];
  }
}
