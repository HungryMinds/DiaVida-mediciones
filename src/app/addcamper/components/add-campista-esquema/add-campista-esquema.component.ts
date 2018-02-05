import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-add-campista-esquema',
  templateUrl: './add-campista-esquema.component.html',
  styleUrls: ['./add-campista-esquema.component.scss']
})
export class AddCampistaEsquemaComponent implements OnInit {
  title: string;
  subtitle: string;
  valueChecked = '1';
  @Input() checked;
  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();
  url = 'camper/add-camper/';
  nextUrl = 'food';
  public esquemaForm: FormGroup;
  camper: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.title = 'Agregar Campista';
    this.subtitle = 'Esquema De Insulina';

    this.createForm();
  }

  createForm() {
    this.esquemaForm = this.fb.group({
      desayudoOption1: ['', Validators.required],
      desayudoOption2: ['', Validators.required],
      desayudoOption3: ['', Validators.required],
      desayudoOption4: ['', Validators.required],
      almuerzoOption1: ['', Validators.required],
      almuerzoOption2: ['', Validators.required],
      almuerzoOption3: ['', Validators.required],
      almuerzoOption4: ['', Validators.required],
      cenaOption1: ['', Validators.required],
      cenaOption2: ['', Validators.required],
      cenaOption3: ['', Validators.required],
      cenaOption4: ['', Validators.required],
      comments: ['', Validators.required]
    });
  }

  toogleView(event) {
    this.valueChecked = event.value;
  }

  next(event) {
    event.preventDefault();
    this.camper = { ...this.camper, ...this.esquemaForm.value };
    console.table(this.camper);
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
