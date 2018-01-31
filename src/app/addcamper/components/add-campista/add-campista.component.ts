import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-campista',
  templateUrl: './add-campista.component.html',
  styleUrls: ['./add-campista.component.scss']
})
export class AddCampistaComponent implements OnInit {
  title: string;
  subtitle: string;

  constructor() {
    this.title = 'Agregar Campista';
    this.subtitle = 'Detalles básicos';
  }

  ngOnInit() {}
}
