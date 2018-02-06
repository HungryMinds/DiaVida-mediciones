import { Component, OnInit } from '@angular/core';
import { CampistService } from '../core'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-camperdetail',
  templateUrl: './camperdetail.component.html',
  styleUrls: ['./camperdetail.component.scss']
})
export class CamperdetailComponent implements OnInit {
  private camperSubscription: any;
  private camper: any;  
  id: number;
  aditionalMedication: string
  allergies: string
  basalInsulin: string
  errorButtonMessage: string
  insulinMessage: string
  errorButtonCheck: boolean
  insulinScheme1: boolean = false
  insulinScheme2: boolean = false
  needsBasalInsulin: boolean = true
  insulinComment: string

  constructor(private cs: CampistService, private route: ActivatedRoute) {
    this.aditionalMedication = 'Beclometasona en inhalador';
    this.allergies = 'Abejas, queso y mariscos';
    this.basalInsulin = 'No necesita insulina basal';
    this.errorButtonMessage = 'ELIMINAR';
    this.errorButtonCheck = false;
    this.insulinComment = 'tarde 2-3 unidades si es necesario';
  }

  ngOnInit() {
    this.camperSubscription = this.route.params.subscribe(params => {
       this.id = params['id'];

       this.cs.getSingleCampist(this.id).subscribe(x => {
        this.camper = x;
        console.log(this.camper);
      })
    });
  }

  ngOnDestroy() {
    this.camperSubscription.unsubscribe();
  }

  getCamper(id) {
    console.log('camper');
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
}
