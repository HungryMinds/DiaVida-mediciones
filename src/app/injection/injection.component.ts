import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogService } from '../core'

@Component({
  selector: 'app-injection',
  templateUrl: './injection.component.html',
  styleUrls: ['./injection.component.scss']
})
export class InjectionComponent implements OnInit {

  public form: FormGroup;

  title: string;
  subtitle: string;

  constructor(private fb: FormBuilder, private ls: LogService) {
    this.title = 'Agregar Inyección';
    this.subtitle = 'Detalles';
    this.createForm()
  }

  ngOnInit() {
  }

  createForm() {
    this.form = this.fb.group({
      weight: ['', [Validators.required]],
      datetime: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log (this.form.value)
    
  }

}
