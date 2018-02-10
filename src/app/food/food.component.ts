import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogFoodService, inyectionType } from '../core'
import { LogFood, Campist, Snack } from '../core'
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  id
  foods = Object.entries(Snack)

  public form: FormGroup;

  title: string;
  subtitle: string;

  constructor(private fb: FormBuilder, private LogIS: LogFoodService, private router: Router, private route: ActivatedRoute) {
    this.title = 'Agregar Comida Extra';
    this.subtitle = 'Detalles';
    this.createForm()
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  createForm() {
    var d = new Date()
    this.form = this.fb.group({
      foodType: ['', [Validators.required]],
      value: ['', [Validators.required]],
      date: [this.currentDate(), Validators.required],
      time: [this.currenTime(), Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    var objToSend = {
      id: null,
      date: new Date(this.form.value.date + ' ' + this.form.value.time),
      value: this.form.value.value,
      description: this.form.value.description,
      type: this.form.value.foodType
    }
    //TODO  Use current campist id
    this.LogIS.addLogFood(new LogFood(objToSend), this.id)
    //TODO  Redirect to current campist id
    this.router.navigate(['/camperDetail/' + this.id]);
  }

  currentDate() {
    var date = new Date(); // Or the date you'd like converted.
    var isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    return isoDate.substring(0, 10);
  }

  currenTime() {
    const currentDate = new Date();
    return currentDate.toTimeString().substring(0, 5)
  }


}
