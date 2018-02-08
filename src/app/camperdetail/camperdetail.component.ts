import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampistService } from '../core';

@Component({
  selector: 'app-camperdetail',
  templateUrl: './camperdetail.component.html',
  styleUrls: ['./camperdetail.component.scss']
})
export class CamperdetailComponent implements OnInit, OnDestroy {
  private subs = [];
  private logs: any[];
  private camper: any;
  idCamper: string;
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
    this.idCamper = this.route.snapshot.params.id;

    this.subs.push(
      this.cs.getSingleCampist(this.idCamper).subscribe(_camper => {
        this.camper = _camper;
        this.userName = `${_camper.names} ${_camper.lastNames}`;
      })
    );
    this.subs.push(
      this.cs.getLogsCampist(this.idCamper).subscribe(data => {
        data = data.sort((a, b) => {
          const aT = new Date(a.date).getTime();
          const bT = new Date(b.date).getTime();
          return bT - aT;
        });
        const orderedByDay = data.reduce((acum, curr, idx) => {
          curr.date = new Date(curr.date);
          if (!acum.length) {
            // array vacio
            acum.push([curr]);
          } else {
            // si es un dia distinto
            if (
              new Date(curr.date).getDay() !==
              new Date(acum[acum.length - 1][0].date).getDay()
            ) {
              acum.push([curr]);
            } else {
              // si son del mismo dia
              acum[acum.length - 1].push(curr);
            }
          }
          return acum;
        }, []) as any[];
        console.log(orderedByDay);
        this.logs = orderedByDay;
      })
    );
  }

  ngOnDestroy() {
    if (this.subs.length) {
      this.subs.forEach(sub => {
        if (sub.unsubscribe) {
          sub.unsubscribe();
        }
      });
    }
  }

  deleteCamper(id) {
    if (!this.errorButtonCheck) {
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
  editCamper() {
    // Navigate to the next view
    this.router.navigate(['camper/edit/', this.idCamper]);
  }
  openFloat(e) {
    console.log(e);
  }

  openNewMedition() {
    this.router.navigateByUrl(`/camperDetail/${this.idCamper}/measurement`);
  }
  openNewInjection() {
    this.router.navigateByUrl(`/camperDetail/${this.idCamper}/injection`);
  }
  openNewFood() {
    this.router.navigateByUrl(`/camperDetail/${this.idCamper}/food`);
  }
}
