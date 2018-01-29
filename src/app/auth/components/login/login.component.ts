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
import { AngularFireAuth } from 'angularfire2/auth';
import { setTimeout } from 'timers';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('grow', [
      state('small', style('*')),
      state('large', style({ height: '312px', top: '80px' })),
      transition('small => large', [
        animate(
          '.3s cubic-bezier(.42,0,.58,1)',
          style({ height: '312px', top: '80px' })
        )
      ]),
      transition('large => small', [
        animate('.3s cubic-bezier(.42,0,.58,1)', style({ height: '*', top: 0 }))
      ])
    ])
  ]
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, public fbAuth: AngularFireAuth) {
    this.createForm();
  }

  state = 'small';
  errorWhenSubmitted: Boolean = false;
  error: string;

  expand() {
    this.state = this.state === 'small' ? 'large' : 'small';
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  setErrorMessage(err) {
    if (err.code === 'auth/user-not-found') {
      this.error = '¡El usuario no existe!';
    } else if (err.code === 'auth/wrong-password') {
      this.error = '¡Usuario o contraseña incorrecto';
    }
  }

  onSubmit() {
    this.fbAuth.auth
      .signInWithEmailAndPassword(
        this.loginForm.value.email,
        this.loginForm.value.password
      )
      .then(console.log)
      .catch(err => {
        this.errorWhenSubmitted = true;
        this.setErrorMessage(err);
        console.log(err);
      });
  }
}
