import { BasalInsulin } from './../../../core/services/models/basal-insulin.class';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CampistService } from '../../../core/services/campist.service';
import { FormLifeCycleService } from '../../form-life-cycle.service'


@Component({
  selector: 'app-add-campista',
  templateUrl: './add-campista-dosis.component.html',
  styleUrls: ['./add-campista-dosis.component.scss']
})
export class AddCampistaDosisComponent implements OnInit {
  title: string;
  subtitle: string;
  color: '#24a99b';
  isChecked: Boolean = false;
  @Input() checked;
  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();
  url = 'camper/add-camper/';
  previewsUrl = 'edit/';
  nextUrl = 'esquema';
  public dosisForm: FormGroup;
  camper: any;

  constructor(
    private _flcs: FormLifeCycleService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private campistService: CampistService
  ) {
    this.title = 'Agregar Campista';
    this.subtitle = 'Dosis Basal';

    this.createForm();
  }

  createForm() {
    this.dosisForm = this.fb.group({
      basalInsulin: this.fb.group({
        'first-application': this.fb.group({
          time: [''],
          dosage: [''],
        }),
        'second-application': this.fb.group({
          time: [''],
          dosage: [''],
          'second-stime': [''],
          'second-sdosage': ['']
        })
      })
    });
  }

  toogleView(event) {
    this.isChecked = event.checked;
  }

  next(event) {
    event.preventDefault();
    const fBasal = {
      'first-application': {
        dosage: this.dosisForm.value.basalInsulin['first-application'].dosage,
        time: this.dosisForm.value.basalInsulin['first-application'].time
      }
    };

    const sBasal = {
      'first-application': {
        dosage: this.dosisForm.value.basalInsulin['first-application'].dosage,
        time: this.dosisForm.value.basalInsulin['first-application'].time
      },
      'second-application': {
        dosage: this.dosisForm.value.basalInsulin['second-application'].dosage,
        time: this.dosisForm.value.basalInsulin['second-application'].time
      }
    };

    const basalInsulin = !this.isChecked ? fBasal : sBasal;

    this._flcs.updateCurrentCampiest({ basalInsulin })

    this.router.navigate([this.url + this.nextUrl]);
  }

  goBack(event) {
    event.preventDefault();
    this.router.navigate([this.url + this.previewsUrl]);
  }

  ngOnInit() {
    console.log('Got campist ', this._flcs.getCurrentCampiest())
    this.dosisForm.patchValue(this._flcs.getCurrentCampiest())
    if (this._flcs.getCurrentCampiest() && this._flcs.getCurrentCampiest()['basalInsulin'] && this._flcs.getCurrentCampiest()['basalInsulin']['second-application']) {
      this.checked = true
      this.isChecked = true
    }
  }
}
