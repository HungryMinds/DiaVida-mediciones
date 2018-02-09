import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CampistService } from '../../../core/services/campist.service';
import { FormLifeCycleService } from '../../form-life-cycle.service';

@Component({
  selector: 'app-add-campista-esquema',
  templateUrl: './add-campista-esquema.component.html',
  styleUrls: ['./add-campista-esquema.component.scss']
})
export class AddCampistaEsquemaComponent implements OnInit {
  title: string;
  subtitle: string;
  valueChecked = '1';
  checkedInterval = true;
  checkedRatio = false;
  previewsUrl = 'dosis';
  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();
  url = 'camper/add-camper/';
  nextUrl = 'food';
  public esquemaForm: FormGroup;
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
    this.subtitle = 'Esquema De Insulina';

    this.createForm();
  }

  createForm() {
    this.esquemaForm = this.fb.group({
      insulinSchemeInterval: this.fb.group({
        comments: [''],
        '<80': this.fb.group({
          Breakfast: [''],
          Lunch: [''],
          Diner: ['']
        }),
        '81-160': this.fb.group({
          Breakfast: [''],
          Lunch: [''],
          Diner: ['']
        }),
        '161-250': this.fb.group({
          Breakfast: [''],
          Lunch: [''],
          Diner: ['']
        }),
        '>250': this.fb.group({
          Breakfast: [''],
          Lunch: [''],
          Diner: ['']
        })
      }),
      insulinSchemeRatio: this.fb.group({
        Breakfast: [''],
        Lunch: [''],
        Diner: [''],
        correctionFactor: [''],
        comment: ['']
      })
    });
  }

  toogleView(event) {
    this.valueChecked = event.value;
  }

  next(event) {
    event.preventDefault();
    const { Breakfast, Lunch, Diner, correctionFactor, comment } = this.esquemaForm.value.insulinSchemeRatio;

    const insulinSchemeInterval = {
      comments: this.esquemaForm.value.insulinSchemeInterval.comments,
      '<80': {
        Breakfast: this.esquemaForm.value.insulinSchemeInterval['<80'].Breakfast,
        Lunch: this.esquemaForm.value.insulinSchemeInterval['<80'].Lunch,
        Diner: this.esquemaForm.value.insulinSchemeInterval['<80'].Diner
      },
      '81-160': {
        Breakfast: this.esquemaForm.value.insulinSchemeInterval['81-160'].Breakfast,
        Lunch: this.esquemaForm.value.insulinSchemeInterval['81-160'].Lunch,
        Diner: this.esquemaForm.value.insulinSchemeInterval['81-160'].Diner
      },
      '161-250': {
        Breakfast: this.esquemaForm.value.insulinSchemeInterval['161-250'].Breakfast,
        Lunch: this.esquemaForm.value.insulinSchemeInterval['161-250'].Lunch,
        Diner: this.esquemaForm.value.insulinSchemeInterval['161-250'].Diner
      },
      '>250': {
        Breakfast: this.esquemaForm.value.insulinSchemeInterval['>250'].Breakfast,
        Lunch: this.esquemaForm.value.insulinSchemeInterval['>250'].Lunch,
        Diner: this.esquemaForm.value.insulinSchemeInterval['>250'].Diner
      }
    };

    const insulinSchemeRatio = {
      Breakfast: Breakfast,
      Lunch: Lunch,
      Diner: Diner,
      correctionFactor: correctionFactor,
      comment: comment
    };

    if (this.valueChecked === '1') {
      this._flcs.updateCurrentCampiest({ insulinSchemeInterval, insulinSchemeRatio: null });
    } else {
      this._flcs.updateCurrentCampiest({ insulinSchemeRatio, insulinSchemeInterval: null });
    }

    this.router.navigate([this.url + this.nextUrl]);
  }

  goBack(event) {
    if (event) {
      event.preventDefault();
    }
    this.router.navigate([this.url + this.previewsUrl]);
  }

  ngOnInit() {
    console.log('Got campist ', this._flcs.getCurrentCampiest());
    const campist = this.clean(this._flcs.getCurrentCampiest());
    this.esquemaForm.patchValue(campist);
    if (campist.insulinSchemeRatio) {
      this.valueChecked = '2';
      this.checkedRatio = true;
      this.checkedInterval = false;
    }
  }

  clean(obj) {
    const propNames = Object.getOwnPropertyNames(obj);
    for (let i = 0; i < propNames.length; i++) {
      const propName = propNames[i];
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj;
  }
}
