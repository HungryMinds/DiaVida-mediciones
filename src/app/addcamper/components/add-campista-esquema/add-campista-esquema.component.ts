import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-campista-esquema',
  templateUrl: './add-campista-esquema.component.html',
  styleUrls: ['./add-campista-esquema.component.scss']
})
export class AddCampistaEsquemaComponent implements OnInit {
  title: string;
  subtitle: string;
  valueChecked = '1';
  @Input() checked;
  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    this.title = 'Agregar Campista';
    this.subtitle = 'Esquema De Insulina';
  }

  toogleView(event) {
    this.valueChecked = event.value;
  }

  ngOnInit() {}
}
