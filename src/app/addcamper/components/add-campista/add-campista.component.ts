import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-add-campista',
  templateUrl: './add-campista.component.html',
  styleUrls: ['./add-campista.component.scss']
})
export class AddCampistaComponent implements OnInit {
  title: string;
  subtitle: string;
  url = 'camper/add-camper/';
  nextUrl = 'dosis';
  public basicsForm: FormGroup;
  camper: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.title = 'Agregar Campista';
    this.subtitle = 'Detalles básicos';

    this.createForm();
  }

  createForm() {
    this.basicsForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      age: [''],
      weight: [''],
      equipo: [''],
      meds: [''],
      allergies: ['']
    });
  }

  next(event) {
    event.preventDefault();
    this.camper = { ...this.basicsForm.value };
    // Navigate to the next view
    this.router.navigate([this.url + this.nextUrl, this.camper]);
  }

  goBack(event) {
    event.preventDefault();
  }

  ngOnInit() {}
}
