import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampistService } from '../../../core/services/campist.service';

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
  camperId: string = null;
  camperToEdit: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private campistService: CampistService, ) {
    this.title = 'Agregar Campista';
    this.subtitle = 'Detalles básicos';

    this.createForm();
  }

  createForm() {
    this.basicsForm = this.fb.group({
      names: ['', Validators.required],
      lastNames: ['', Validators.required],
      age: [''],
      weight: [''],
      team: [''],
      allergies: [''],
      medications: ['']
    });
  }

  next(event) {
    event.preventDefault();
    const id = this.camperId;
    this.camper = { ...this.basicsForm.value, id };

    // Navigate to the next view
    this.router.navigate([this.url + this.nextUrl, ...this.camper]);
  }

  goBack(event) {
    event.preventDefault();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.camperId = params.id;
    });

    if (this.camperId) {
      this.getCampistToEdit(this.camperId);
    }
  }

  getCampistToEdit(id) {
    return this.campistService.getSingleCampist(id).subscribe(camper => {
      this.camperToEdit = { ...camper };
      this.basicsForm.patchValue(camper);
    });
  }
}
