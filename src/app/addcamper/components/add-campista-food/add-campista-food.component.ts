import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampistService } from '../../../core/services/campist.service';
import { Location } from '@angular/common';
import { FormLifeCycleService } from '../../form-life-cycle.service'


@Component({
  selector: 'app-add-campista-food',
  templateUrl: './add-campista-food.component.html',
  styleUrls: ['./add-campista-food.component.scss']
})
export class AddCampistaFoodComponent implements OnInit {
  title: string;
  subtitle: string;
  url = '/';
  nextUrl = 'listado';
  previewsUrl = 'camper/add-camper/esquema'
  public foodForm: FormGroup;
  camper: any;

  constructor(
    private _flcs: FormLifeCycleService,
    private campistService: CampistService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {
    this.title = 'Agregar Campista';
    this.subtitle = 'Porción De Alimentos';

    this.createForm();
  }

  createForm() {
    this.foodForm = this.fb.group({
      foodTable: this.fb.group({
        carb: this.fb.group({
          Breakfast: [''],
          Lunch: [''],
          Diner: [''],
          MorningSnack: [''],
          AfternoonSnack: [''],
          BeforeSleep: ['']
        }),
        fruta: this.fb.group({
          Breakfast: [''],
          Lunch: [''],
          Diner: [''],
          MorningSnack: [''],
          AfternoonSnack: [''],
          BeforeSleep: ['']
        }),
        prot: this.fb.group({
          Breakfast: [''],
          Lunch: [''],
          Diner: [''],
          MorningSnack: [''],
          AfternoonSnack: [''],
          BeforeSleep: ['']
        }),
        lact: this.fb.group({
          Breakfast: [''],
          Lunch: [''],
          Diner: [''],
          MorningSnack: [''],
          AfternoonSnack: [''],
          BeforeSleep: ['']
        })
      })
    });
  }

  save(event) {
    event.preventDefault();

    const foodTable = ({
      fruta: {
        Breakfast: this.foodForm.value.foodTable.fruta.Breakfast,
        MorningSnack: this.foodForm.value.foodTable.fruta.MorningSnack,
        Lunch: this.foodForm.value.foodTable.fruta.Lunch,
        AfternoonSnack: this.foodForm.value.foodTable.fruta.AfternoonSnack,
        Diner: this.foodForm.value.foodTable.fruta.Diner,
        BeforeSleep: this.foodForm.value.foodTable.fruta.BeforeSleep
      },
      prot: {
        Breakfast: this.foodForm.value.foodTable.prot.Breakfast,
        MorningSnack: this.foodForm.value.foodTable.prot.MorningSnack,
        Lunch: this.foodForm.value.foodTable.prot.Lunch,
        AfternoonSnack: this.foodForm.value.foodTable.prot.AfternoonSnack,
        Diner: this.foodForm.value.foodTable.prot.Diner,
        BeforeSleep: this.foodForm.value.foodTable.prot.BeforeSleep
      },
      carb: {
        Breakfast: this.foodForm.value.foodTable.carb.Breakfast,
        MorningSnack: this.foodForm.value.foodTable.carb.MorningSnack,
        Lunch: this.foodForm.value.foodTable.carb.Lunch,
        AfternoonSnack: this.foodForm.value.foodTable.carb.AfternoonSnack,
        Diner: this.foodForm.value.foodTable.carb.Diner,
        BeforeSleep: this.foodForm.value.foodTable.carb.BeforeSleep
      },
      lact: {
        Breakfast: this.foodForm.value.foodTable.lact.Breakfast,
        MorningSnack: this.foodForm.value.foodTable.lact.MorningSnack,
        Lunch: this.foodForm.value.foodTable.lact.Lunch,
        AfternoonSnack: this.foodForm.value.foodTable.lact.AfternoonSnack,
        Diner: this.foodForm.value.foodTable.lact.Diner,
        BeforeSleep: this.foodForm.value.foodTable.lact.BeforeSleep
      }
    });

    this._flcs.updateCurrentCampiest({ foodTable })
    this.camper = this._flcs.getCurrentCampiest()

    // Save the data to database
    const newCamper = this.camper;
    console.log('The New Camper')
    console.log(newCamper)


    if (newCamper.id) {
      this.campistService.updateCampist(newCamper);
    } else {
      this.campistService.addCampist(newCamper);
    }
    this._flcs.cleanCurrent()
    // Navigate to the next view
    this.router.navigate([this.url + this.nextUrl]);
  }

  goBack = (event) => {
    if (event)
      event.preventDefault();
    this.router.navigate([this.url + this.previewsUrl]);
  }

  getCampistToEdit(id) {
    return this.campistService.getSingleCampist(id).subscribe(camper => {
      console.log('CAMPER', camper);
      this.foodForm.patchValue(camper);
    });
  }

  ngOnInit() {
    console.log('Got campist ', this._flcs.getCurrentCampiest())
    this.foodForm.patchValue(this._flcs.getCurrentCampiest())
  }
}
