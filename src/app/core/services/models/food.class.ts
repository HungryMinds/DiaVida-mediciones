export class FoodTable {
  foodTime: string;
  foodType: string;

  constructor(fdRw: any) {
    this.foodTime = fdRw.foodTime;
    this.foodType = fdRw.foodType;
  }
}
