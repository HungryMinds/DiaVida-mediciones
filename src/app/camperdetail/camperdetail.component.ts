import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampistService } from '../core';

@Component({
  selector: 'app-camperdetail',
  templateUrl: './camperdetail.component.html',
  styleUrls: ['./camperdetail.component.scss']
})
  export class CamperdetailComponent implements OnInit, OnDestroy {
  private camperSubscription: any;
  private camper: any;
  // private button: any = document.getElementById("deleteCamperButton")[0];
  id: string;
  aditionalMedication: string;
  allergies: string;
  basalInsulin: string;
  errorButtonMessage: string;
  insulinMessage: string;
  errorButtonCheck: boolean;
  insulinScheme1 = true;
  insulinScheme2 = false;
  needsBasalInsulin = true;
  insulinComment: string;
  userName: string;
  camperId: string;
  deleteButtonWidth: string;

  constructor(
    private cs: CampistService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.aditionalMedication = 'Beclometasona en inhalador';
    this.allergies = 'Abejas, queso y mariscos';
    this.basalInsulin = 'No necesita insulina basal';
    this.errorButtonMessage = 'ELIMINAR';
    this.errorButtonCheck = false;
    this.insulinComment = 'tarde 2-3 unidades si es necesario';
  }

  ngOnInit() {
    
    this.id = this.route.snapshot.params.id;

    this.camperSubscription = this.cs
      .getSingleCampist(this.id)
      .subscribe(_camper => {
        this.camper = _camper;
        console.log(this.camper)
        this.userName = `${_camper.names} ${_camper.lastNames}`;
      });
      this.deleteButtonWidth = this.getWidthOfText("ELIMINAR", "14") +40+ "px";
  }

   getWidthOfText(txt, fontsize) {
    var c = document.createElement('canvas');
    var ctx = c.getContext('2d');
    ctx.font = fontsize + 'px' ;
    var length = ctx.measureText(txt).width;
    return length;
  }

  ngOnDestroy() {
    this.camperSubscription.unsubscribe();
  }

  deleteCamper(id) {
    if (!this.errorButtonCheck) {
      // setTimeout(function() {
      // this.errorButtonMessage = 'ELIMINAR EL CAMPISTA';
      // }, 400);
      this.deleteButtonWidth = this.getWidthOfText("ELIMINAR EL CAMPISTA", "14") +100+ "px";
      this.errorButtonMessage = 'ELIMINAR EL CAMPISTA';
      // TODO: Por ahora lo quita para probar
      this.errorButtonCheck = true;
    } else {
      this.cs.deleteCampist(id);
      this.router.navigate(['/listado']);
      // TODO: Por ahora lo quita para probar
      this.errorButtonMessage = 'ELIMINAR';
      this.errorButtonCheck = false;
    }
  }
  editCamper(id) {
    // Navigate to the next view
    this.router.navigate(['/camper/add-camper/edit/', id]);
  }
}
