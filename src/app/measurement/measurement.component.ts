import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogMeditionService, LogMedition, FoodTime } from '../core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.scss']
})
export class MeasurementComponent implements OnInit {

  foods = Object.entries(FoodTime);
  id;

  public form: FormGroup;

  title: string;
  subtitle: string;

  constructor(private fb: FormBuilder, private LogMS: LogMeditionService, private router: Router, private route: ActivatedRoute) {
    this.title = 'Agregar Glicemia';
    this.subtitle = 'Detalles';
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  createForm() {
    const d = new Date();
    this.form = this.fb.group({
      value: ['', [Validators.required]],
      date: [this.currentDate(), Validators.required],
      time: [this.currenTime(), Validators.required],
      description: [''],
      foodTime: ['', Validators.required]
    });
  }

  onSubmit() {
    const objToSend = {
      id: null,
      date: new Date(this.form.value.date + ' ' + this.form.value.time),
      value: this.form.value.value,
      description: this.form.value.description,
      foodTime : this.form.value.foodTime
    };
    console.log(objToSend);
    // TODO  Use current campist id
    this.LogMS.addLogMedition(new LogMedition(objToSend), this.id);
    // TODO  Redirect to current campist id
    this.router.navigate(['/camperDetail/' + this.id]);
  }

  currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0, 10);
  }

  currenTime() {
    const currentDate = new Date();
    return currentDate.toTimeString().substring(0, 5);
  }

}
