import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampistService } from '../../../core/services/campist.service';
import { FormLifeCycleService } from '../../form-life-cycle.service';

@Component({
  selector: 'app-add-campista',
  templateUrl: './add-campista.component.html',
  styleUrls: ['./add-campista.component.scss']
})
export class AddCampistaComponent implements OnInit {
  title: string;
  subtitle: string;
  url = 'camper/add-camper/';
  nextUrl = 'dosis';
  public basicsForm: FormGroup;
  camper: any;
  camperId: string = null;
  camperToEdit: any;

  constructor(
    private _flcs: FormLifeCycleService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private campistService: CampistService
  ) {
    this.title = 'Agregar Campista';
    this.subtitle = 'Detalles básicos';

    this.createForm();
  }

  createForm() {
    this.basicsForm = this.fb.group({
      names: ['', Validators.required],
      lastNames: ['', Validators.required],
      age: ['', Validators.required],
      weight: ['', Validators.required],
      team: ['', Validators.required],
      allergies: [''],
      medications: ['']
    });
  }

  next(event) {
    event.preventDefault();
    this._flcs.updateCurrentCampiest(this.basicsForm.value);

    // Navigate to the next view
    this.router.navigate([this.url + this.nextUrl]);
  }

  goBack(event) {
    if (event) {
      event.preventDefault();
    }
    this.router.navigate(['/listado']);
  }

  ngOnInit() {
    if (this.router.url.indexOf('edit') > -1) {
      this.route.params.subscribe(params => {
        this.camperId = params.id;
      });

      if (this.camperId) {
        this.getCampistToEdit(this.camperId);
      } else {
        console.log('Got campist not from id ', this._flcs.getCurrentCampiest());
        this.basicsForm.patchValue(this._flcs.getCurrentCampiest());
      }
    }
  }

  getCampistToEdit(id) {
    return this.campistService.getSingleCampist(id).subscribe(camper => {
      camper.id = id;
      this._flcs.updateCurrentCampiest(camper);
      this.basicsForm.patchValue(camper);
    });
  }
}
