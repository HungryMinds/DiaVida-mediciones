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
  errorButtonMessage: string
  errorButtonCheck: boolean

  constructor() { 
    this.aditionalMedication = 'Beclometasona en inhalador';
    this.allergies = 'Abejas, queso y mariscos';
    this.basalInsulin = 'No necesita insulina basal';
    this.errorButtonMessage = 'ELIMINAR';
    this.errorButtonCheck = false;
  }

  deleteCamper(id) {
    if (!this.errorButtonCheck) {
      this.errorButtonMessage = 'ELIMINAR EL CAMPISTA';
      // TODO: Por ahora lo quita para probar      
      this.errorButtonCheck = true;  
    } else {
      console.log('Delete camper Function!')
      // TODO: Por ahora lo quita para probar
      this.errorButtonMessage = 'ELIMINAR';
      this.errorButtonCheck = false;        
    }
  }

  

  ngOnInit() {
  }

}
