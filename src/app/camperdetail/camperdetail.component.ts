import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camperdetail',
  templateUrl: './camperdetail.component.html',
  styleUrls: ['./camperdetail.component.scss']
})
export class CamperdetailComponent implements OnInit {
  aditionalMedication: string
  allergies: string
  basalInsulin: string

  constructor() { 
    this.aditionalMedication = 'Beclometasona en inhalador';
    this.allergies = 'Abejas, queso y mariscos';
    this.basalInsulin = 'No necesita insulina basal';
  }

  ngOnInit() {
  }

}
