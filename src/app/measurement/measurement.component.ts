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
  idMeasurement
  idCampist
  currentEdit: LogMedition;

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
      this.idCampist = params['id'];
    });
    this.loadEditMode();
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
      foodTime: this.form.value.foodTime
    };

    if (this.currentEdit) {
      this.LogMS.patchMedition(new LogMedition(objToSend), this.currentEdit.id);
    } else {
      this.LogMS.addLogMedition(new LogMedition(objToSend), this.idCampist);
    }

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
    this.LogMS.deleteLogMedition(this.currentEdit.id);
    this.router.navigate(['/camperDetail/' + this.idCampist]);
  }

  loadEditMode() {
    this.idMeasurement = this.route.snapshot.params.idMeasurement;
    console.log('ids ', this.idCampist, ' ', this.idMeasurement);
    if (this.idMeasurement) {
      this.title = 'Editar Inyección';
      this.LogMS.getLogMedition(this.idMeasurement)
        .subscribe((data) => {
          if (data) {
            this.currentEdit = data;
            console.log(data);
            const info = {
              value: data.value,
              date: new Date(data.date).toISOString().substring(0, 10),
              time: new Date(data.date).toTimeString().substring(0, 5),
              foodTime: data.foodTime,
              description: data.description
            };
            this.form.patchValue(info);
          }
        });
    }
  }

}
