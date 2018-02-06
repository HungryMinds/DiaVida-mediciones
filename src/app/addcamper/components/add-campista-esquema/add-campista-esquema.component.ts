import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-campista-esquema',
  templateUrl: './add-campista-esquema.component.html',
  styleUrls: ['./add-campista-esquema.component.scss']
})
export class AddCampistaEsquemaComponent implements OnInit {
  title: string;
  subtitle: string;
  valueChecked = '1';
  @Input() checked;
  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();
  url = 'camper/add-camper/';
  nextUrl = 'food';
  public esquemaForm: FormGroup;
  camper: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {
    this.title = 'Agregar Campista';
    this.subtitle = 'Esquema De Insulina';

    this.createForm();
  }

  createForm() {
    this.esquemaForm = this.fb.group({
      eDesayudoOption1: [''],
      eDesayudoOption2: [''],
      eDesayudoOption3: [''],
      eDesayudoOption4: [''],
      eAlmuerzoOption1: [''],
      eAlmuerzoOption2: [''],
      eAlmuerzoOption3: [''],
      eAlmuerzoOption4: [''],
      eCenaOption1: [''],
      eCenaOption2: [''],
      eCenaOption3: [''],
      eCenaOption4: [''],
      eComments: [''],
      rDesayunoOption: [''],
      rAlmuerzoOption: [''],
      rCenaOption: [''],
      rFactor: [''],
      rComments: ['']
    });
  }

  toogleView(event) {
    this.valueChecked = event.value;
  }

  next(event) {
    event.preventDefault();
    const {
      eDesayudoOption1,
      eDesayudoOption2,
      eDesayudoOption3,
      eDesayudoOption4,
      eAlmuerzoOption1,
      eAlmuerzoOption2,
      eAlmuerzoOption3,
      eAlmuerzoOption4,
      eCenaOption1,
      eCenaOption2,
      eCenaOption3,
      eCenaOption4,
      eComments,
      rDesayunoOption,
      rAlmuerzoOption,
      rCenaOption,
      rFactor,
      rComments
    } = this.esquemaForm.value;

    const schemeInterval = {
      insulinSchemeInterval: {
        comments: eComments,
        '<80': {
          Breakfast: eDesayudoOption1,
          Lunch: eAlmuerzoOption1,
          Diner: eCenaOption1
        },
        '81-160': {
          Breakfast: eDesayudoOption2,
          Lunch: eAlmuerzoOption2,
          Diner: eCenaOption2
        },
        '161-250': {
          Breakfast: eDesayudoOption3,
          Lunch: eAlmuerzoOption3,
          Diner: eCenaOption3
        },
        '>250': {
          Breakfast: eDesayudoOption4,
          Lunch: eAlmuerzoOption4,
          Diner: eCenaOption4
        }
      }
    };

    const schemeRatio = {
      insulinSchemeRatio: {
        Breakfast: rDesayunoOption,
        Lunch: rAlmuerzoOption,
        Diner: rCenaOption,
        correctionFactor: rFactor,
        comment: rComments
      }
    };

    const schema = this.valueChecked === '1' ? schemeInterval : schemeRatio;

    this.camper = {
      ...this.camper,
      ...schema
    };
    this.camper = { ...this.camper };
    // Navigate to the next view
    this.router.navigate([this.url + this.nextUrl, this.camper]);
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
