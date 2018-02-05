import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-add-campista',
  templateUrl: './add-campista-dosis.component.html',
  styleUrls: ['./add-campista-dosis.component.scss']
})
export class AddCampistaDosisComponent implements OnInit {
  title: string;
  subtitle: string;
  color: '#24a99b';
  isChecked: Boolean = false;
  @Input() checked;
  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();
  url = 'camper/add-camper/';
  nextUrl = 'dosis';
  public dosisForm: FormGroup;
  camper: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.title = 'Agregar Campista';
    this.subtitle = 'Dosis Basal';

    this.createForm();
  }

  createForm() {
    this.dosisForm = this.fb.group({
      time: ['', Validators.required],
      dosis: ['', Validators.required],
      'second-time': [''],
      'second-dosis': ['']
    });
  }

  toogleView(event) {
    this.isChecked = event.checked;
  }

  next(event) {
    event.preventDefault();
    this.camper = { ...this.camper, ...this.dosisForm.value };
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
