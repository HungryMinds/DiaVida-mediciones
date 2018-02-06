import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { CampistService } from '../../../core/services/campist.service';

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
    private router: Router
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
    this.camper = { ...this.camper, ...this.foodForm.value };
    console.log('CAMPER: ', this.camper);
    // Save the data to database
    // this.campistService.addCampist(this.camper);
    // Navigate to the next view
    this.router.navigate([this.url + this.nextUrl, this.camper]);
  }

  goBack(event) {
    event.preventDefault();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.camper = params;
    });
  }
}
