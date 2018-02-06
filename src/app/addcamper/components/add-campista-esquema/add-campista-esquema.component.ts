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
      eDesayudoOption1: [''],
      eDesayudoOption2: [''],
      eDesayudoOption3: [''],
      eDesayudoOption4: [''],
      eAlmuerzoOption1: [''],
      eAlmuerzoOption2: [''],
      eAlmuerzoOption3: [''],
      eAlmuerzoOption4: [''],
      eCenaOption1: [''],
      eCenaOption2: [''],
      eCenaOption3: [''],
      eCenaOption4: [''],
      eComments: [''],
      rDesayunoOption: [''],
      rAlmuerzoOption: [''],
      rCenaOption: [''],
      rFactor: [''],
      rComments: ['']
    });
  }

  toogleView(event) {
    this.valueChecked = event.value;
  }

  next(event) {
    event.preventDefault();
    this.camper = { ...this.camper, ...this.esquemaForm.value };
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
