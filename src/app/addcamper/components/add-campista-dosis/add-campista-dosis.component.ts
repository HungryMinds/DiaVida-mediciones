import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-campista',
  templateUrl: './add-campista-dosis.component.html',
  styleUrls: ['./add-campista-dosis.component.scss']
})
export class AddCampistaDosisComponent implements OnInit {
  title: string;
  subtitle: string;
  isChecked: Boolean = false;
  @Input() checked;
  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    this.title = 'Agregar Campista';
    this.subtitle = 'Dosis Basal';
  }

  toogleView(event) {
    this.isChecked = event.checked;
  }

  ngOnInit() {}
}
