import { Component } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  animateChild,
  keyframes,
  state
} from '@angular/animations';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('grow', [
      state('small', style('*')),
      state('large', style({ height: 'auto' })),
      transition('small => large', animate('100ms ease-in')),
      transition('large => small', animate('100ms ease-out'))
    ]),
    trigger('showForm', [
      state('small', style({ opacity: 0 })),
      state('large', style({ opacity: 1 })),
      transition('small => large', animate('100ms ease-in')),
      transition('large => small', animate('100ms ease-out'))
    ])
  ]
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  state = 'small';

  animateMe() {
    this.state = this.state === 'small' ? 'large' : 'small';
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }
}
