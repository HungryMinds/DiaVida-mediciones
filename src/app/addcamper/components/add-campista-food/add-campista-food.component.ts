import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-campista-food',
  templateUrl: './add-campista-food.component.html',
  styleUrls: ['./add-campista-food.component.scss']
})
export class AddCampistaFoodComponent implements OnInit {
  title: string;
  subtitle: string;

  constructor() {
    this.title = 'Agregar Campista';
    this.subtitle = 'Porción De Alimentos';
  }

  ngOnInit() {}
}
