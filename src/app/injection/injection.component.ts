import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogInjectionService, inyectionType } from '../core'
import { LogInjection } from '../core'
import { Campist } from '../core'
import { Router } from '@angular/router';


@Component({
  selector: 'app-injection',
  templateUrl: './injection.component.html',
  styleUrls: ['./injection.component.scss']
})
export class InjectionComponent implements OnInit {

  public form: FormGroup;

  title: string;
  subtitle: string;

  constructor(private fb: FormBuilder, private LogIS: LogInjectionService, private router: Router) {
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
      injectionType: ['quick'],
      description: ['']
    });
  }

  onSubmit() {
    var objToSend = {
      id: null,
      date: new Date(this.form.value.date + ' ' + this.form.value.time),
      value: this.form.value.value,
      description: this.form.value.description,
      type: this.form.value.injectionType
    }
    console.log(objToSend)
    //TODO  Use current campist id
    this.LogIS.addLogInjection(new LogInjection(objToSend), 'B9BpyzwCwL4KEXVmRPi4')
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
