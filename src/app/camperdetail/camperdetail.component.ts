import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampistService } from '../core';

@Component({
  selector: 'app-camperdetail',
  templateUrl: './camperdetail.component.html',
  styleUrls: ['./camperdetail.component.scss']
})
export class CamperdetailComponent implements OnInit {
  aditionalMedication: string;
  allergies: string;
  basalInsulin: string;
  errorButtonMessage: string;
  insulinMessage: string;
  errorButtonCheck: boolean;
  insulinScheme1: boolean = true;
  insulinScheme2: boolean = false;
  needsBasalInsulin: boolean = true;
  insulinComment: string;
  camperId: string;

  constructor(private route: ActivatedRoute, private router: Router, private cs: CampistService) {
    this.aditionalMedication = 'Beclometasona en inhalador';
    this.allergies = 'Abejas, queso y mariscos';
    this.basalInsulin = 'No necesita insulina basal';
    this.errorButtonMessage = 'ELIMINAR';
    this.errorButtonCheck = false;
    this.insulinComment = 'tarde 2-3 unidades si es necesario';
  }

  deleteCamper(id) {
    if (!this.errorButtonCheck) {
      this.errorButtonMessage = 'ELIMINAR EL CAMPISTA';
      // TODO: Por ahora lo quita para probar
      this.errorButtonCheck = true;
    } else {
      console.log('Delete camper Function!');
      // TODO: Por ahora lo quita para probar
      this.errorButtonMessage = 'ELIMINAR';
      this.errorButtonCheck = false;
    }
  }

  editCamper() {
    // Navigate to the next view
    this.router.navigate(['camper/add-camper/edit/', this.camperId]);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.camperId = params.id;
    });
    this.cs.getSingleCampist(this.camperId).subscribe(x => {
      console.log(x);
    });
  }
}
