import { BasalInsulin } from './../../../core/services/models/basal-insulin.class';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

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
  nextUrl = 'esquema';
  public dosisForm: FormGroup;
  camper: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {
    this.title = 'Agregar Campista';
    this.subtitle = 'Dosis Basal';

    this.createForm();
  }

  createForm() {
    this.dosisForm = this.fb.group({
      time: [''],
      dosage: [''],
      'second-ftime': [''],
      'second-fdosage': [''],
      'second-stime': [''],
      'second-sdosage': ['']
    });
  }

  toogleView(event) {
    this.isChecked = event.checked;
  }

  next(event) {
    event.preventDefault();

    const fBasal = {
      'first-application': {
        dosage: this.dosisForm.value.dosage,
        time: this.dosisForm.value.time
      }
    };

    const sBasal = {
      'first-application': {
        dosage: this.dosisForm.value['second-fdosage'],
        time: this.dosisForm.value['second-ftime']
      },
      'second-application': {
        dosage: this.dosisForm.value['second-sdosage'],
        time: this.dosisForm.value['second-stime']
      }
    };

    const basalInsulin = !this.isChecked ? JSON.stringify(fBasal) : JSON.stringify(sBasal);

    this.camper = { ...this.camper, basalInsulin };
    this.camper = { ...this.camper };

    // Navigate to the next view
    this.router.navigate([this.url + this.nextUrl, ...this.camper]);
  }

  goBack(event) {
    event.preventDefault();
    this._location.back();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.camper = params;
    });
  }
}
