import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampistService } from '../../../core/services/campist.service';
import { Campist } from '../../../core/services/models/campist.class';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-campista-food',
  templateUrl: './add-campista-food.component.html',
  styleUrls: ['./add-campista-food.component.scss']
})
export class AddCampistaFoodComponent implements OnInit {
  title: string;
  subtitle: string;
  url = 'camper/add-camper/';
  nextUrl = 'food';
  public foodForm: FormGroup;
  camper: any;

  constructor(
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
      desayunoCarbs: [''],
      desayunoProt: [''],
      desayunoFrut: [''],
      desayunoLact: [''],
      almuerzoCarbs: [''],
      almuerzoProt: [''],
      almuerzoFrut: [''],
      almuerzoLact: [''],
      cenaCarbs: [''],
      cenaProt: [''],
      cenaFrut: [''],
      cenaLact: [''],
      meriendaFirstCarbs: [''],
      meriendaFirstProt: [''],
      meriendaFirstFrut: [''],
      meriendaFirstLact: [''],
      meriendaSecondCarbs: [''],
      meriendaSecondProt: [''],
      meriendaSecondFrut: [''],
      meriendaSecondLact: [''],
      meriendaThirdCarbs: [''],
      meriendaThirdProt: [''],
      meriendaThirdFrut: [''],
      meriendaThirdLact: ['']
    });
  }

  save(event) {
    event.preventDefault();
    const {
      desayunoCarbs,
      desayunoProt,
      desayunoFrut,
      desayunoLact,
      almuerzoCarbs,
      almuerzoProt,
      almuerzoFrut,
      almuerzoLact,
      cenaCarbs,
      cenaProt,
      cenaFrut,
      cenaLact,
      meriendaFirstCarbs,
      meriendaFirstProt,
      meriendaFirstFrut,
      meriendaFirstLact,
      meriendaSecondCarbs,
      meriendaSecondProt,
      meriendaSecondFrut,
      meriendaSecondLact,
      meriendaThirdCarbs,
      meriendaThirdProt,
      meriendaThirdFrut,
      meriendaThirdLact
    } = this.foodForm.value;

    this.camper = {
      ...this.camper,
      foodTable: {
        fruta: {
          Breakfast: desayunoFrut,
          MorningSnack: meriendaFirstFrut,
          Lunch: almuerzoFrut,
          AfternoonSnack: meriendaSecondFrut,
          Diner: cenaFrut,
          BeforeSleep: meriendaThirdFrut
        },
        prot: {
          Breakfast: desayunoProt,
          MorningSnack: meriendaFirstProt,
          Lunch: almuerzoProt,
          AfternoonSnack: meriendaSecondProt,
          Diner: cenaProt,
          BeforeSleep: meriendaThirdProt
        },
        carb: {
          Breakfast: desayunoCarbs,
          MorningSnack: meriendaFirstCarbs,
          Lunch: almuerzoCarbs,
          AfternoonSnack: meriendaSecondCarbs,
          Diner: cenaCarbs,
          BeforeSleep: meriendaThirdCarbs
        },
        lact: {
          Breakfast: desayunoLact,
          MorningSnack: meriendaFirstLact,
          Lunch: almuerzoLact,
          AfternoonSnack: meriendaSecondLact,
          Diner: cenaLact,
          BeforeSleep: meriendaThirdLact
        }
      }
    };
    this.camper = { ...this.camper };
    // Save the data to database
    const newCamper = new Campist(this.camper);
    debugger;
    this.campistService.addCampist(newCamper);
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
