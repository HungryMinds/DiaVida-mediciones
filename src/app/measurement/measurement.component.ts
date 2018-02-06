import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogMeditionService, LogMedition, FoodTime } from '../core'
import { Router } from '@angular/router';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.scss']
})
export class MeasurementComponent implements OnInit {

  foods = Object.entries(FoodTime)

  public form: FormGroup;

  title: string;
  subtitle: string;

  constructor(private fb: FormBuilder, private LogMS: LogMeditionService, private router: Router) {
    this.title = 'Agregar Inyección';
    this.subtitle = 'Detalles';
    this.createForm()
  }

  ngOnInit() {
  }

  createForm() {
    var d = new Date()
    this.form = this.fb.group({
      value: ['', [Validators.required]],
      date: [this.currentDate(), Validators.required],
      time: [this.currenTime(), Validators.required],
      description: [''],
      foodTime: [this.currenTime(), Validators.required]
    });
  }

  onSubmit() {
    var objToSend = {
      id: null,
      date: new Date(this.form.value.date + ' ' + this.form.value.time),
      value: this.form.value.value,
      description: this.form.value.description,
    }
    console.log(objToSend)
    //TODO  Use current campist id
    this.LogMS.addLogMedition(new LogMedition(objToSend), 'B9BpyzwCwL4KEXVmRPi4')
    //TODO  Redirect to current campist id
    this.router.navigate(['/listado']);
  }

  currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0, 10);
  }

  currenTime() {
    const currentDate = new Date();
    return currentDate.toTimeString().substring(0, 5)
  }

}
