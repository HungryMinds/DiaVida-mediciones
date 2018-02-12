import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { LogFoodService, inyectionType } from '../core';
import { LogFood, Campist, Snack } from '../core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  idCampist;
  foods = Object.entries(Snack);
  public form: FormGroup;
  title: string;
  subtitle: string;
  idFood;
  currentEdit;

  constructor(
    private fb: FormBuilder,
    private LogIS: LogFoodService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.title = 'Agregar Comida Extra';
    this.subtitle = 'Detalles';
    this.createForm();
  }

  ngOnInit() {
    this.idCampist = this.route.snapshot.params.id;
    this.loadEditMode();

  }

  createForm() {
    const d = new Date();
    this.form = this.fb.group({
      foodType: ['', [Validators.required]],
      value: ['', [Validators.required]],
      date: [this.currentDate(), Validators.required],
      time: [this.currenTime(), Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    const objToSend = {
      id: null,
      date: new Date(this.form.value.date + ' ' + this.form.value.time),
      value: this.form.value.value,
      description: this.form.value.description,
      type: this.form.value.foodType
    };

    if (this.currentEdit) {
      this.LogIS.patchLogFood(new LogFood(objToSend), this.currentEdit.id);
    } else {
      this.LogIS.addLogFood(new LogFood(objToSend), this.idCampist);
    }
    console.log(objToSend);
    this.router.navigate(['/camperDetail/' + this.idCampist]);
  }

  currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0, 10);
  }

  currenTime() {
    const currentDate = new Date();
    return currentDate.toTimeString().substring(0, 5);
  }

  delete() {
    console.log('Delete ' + this.idCampist);
    this.LogIS.deleteFood(this.currentEdit.id);
    this.router.navigate(['/camperDetail/' + this.idCampist]);
  }

  loadEditMode() {
    this.idFood = this.route.snapshot.params.idMeasurement;
    console.log('ids ', this.idCampist, ' ', this.idFood);
    if (this.idFood) {
      this.title = 'Editar Comida';
      this.LogIS.getLogFood(this.idFood)
        .subscribe((data) => {
          if (data) {
            this.currentEdit = data;
            console.log(data);
            const info = {
              value: data.value,
              date: new Date(data.date).toISOString().substring(0, 10),
              time: new Date(data.date).toTimeString().substring(0, 5),
              description: data.description
            };
            this.form.patchValue(info);
          }
        });
    }
  }

}
