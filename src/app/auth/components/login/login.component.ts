import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('grow', [
      state('small', style('*')),
      state('large', style({ height: '312px', top: '30px' })),
      transition('small => large', [
        animate(
          '.3s cubic-bezier(.42,0,.58,1)',
          style({ height: '312px', top: '30px' })
        )
      ]),
      transition('large => small', [
        animate('.3s cubic-bezier(.42,0,.58,1)', style('*'))
      ])
    ]),
    trigger('moveUp', [
      state('small', style('*')),
      state('large', style({ top: '0px' })),
      transition('small => large', [
        animate('.3s cubic-bezier(.42,0,.58,1)', style({ top: '0px' }))
      ]),
      transition('large => small', [
        animate('.3s cubic-bezier(.42,0,.58,1)', style('*'))
      ])
    ])
  ]
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public fbAuth: AngularFireAuth,
    private router: Router
  ) {
    this.createForm();
  }

  state = 'small';
  errorWhenSubmitted: Boolean = false;
  error: string;
  regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  expand() {
    this.state = this.state === 'small' ? 'large' : 'small';
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(this.regExEmail)
        ]
      ],
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

  resetError() {
    this.errorWhenSubmitted = false;
    this.error = '';
  }

  onSubmit() {
    this.fbAuth.auth
      .signInWithEmailAndPassword(
        this.loginForm.value.email,
        this.loginForm.value.password
      )
      .then(res => {
        this.errorWhenSubmitted = false;
        this.error = '';
        // Navigate to listado de campistas
        this.router.navigate(['/listado']);
      })
      .catch(err => {
        this.errorWhenSubmitted = true;
        this.setErrorMessage(err);
      });
  }
}
