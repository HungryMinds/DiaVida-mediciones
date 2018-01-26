/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform imports
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// App Imports
import { SessionService } from '../../../core';
import { InputHandler } from './input-handler.interface';
import { ERROR_MESSAGES } from '../../auth.constants';
import { USER_ROLES } from '../../../shared';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         COMPONENT DECLARATION         •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  /** –––
   *  –– Variables
   */
  public error: { display: boolean; message: string };
  public showPassword: boolean;
  public loggingUser: boolean;

  public loginForm: FormGroup;
  public inputHandlers: {
    networkUser: InputHandler;
    employeeNumber: InputHandler;
  };

  /** –––
   *  –– Constructor
   */
  constructor(private sessionService: SessionService, private router: Router) {
    this.inputHandlers = {
      networkUser: {
        control: new FormControl('', [Validators.required]),
        editing: false,
        invalid: false
      },
      employeeNumber: {
        control: new FormControl('', [Validators.required]),
        editing: false,
        invalid: false
      }
    };

    this.error = { display: false, message: '' };

    this.loginForm = new FormGroup({
      networkUser: this.inputHandlers.networkUser.control,
      employeeNumber: this.inputHandlers.employeeNumber.control
    });
  }

  /** –––
   *  –– Helper methods
   */

  private updateErrorNotification(
    globalDisplay?: boolean,
    globalMessage?: string
  ) {
    if (this.inputHandlers.networkUser.invalid) {
      this.error.display = true;
      this.error.message = this.inputHandlers.networkUser.message;
    } else if (this.inputHandlers.employeeNumber.invalid) {
      this.error.display = true;
      this.error.message = this.inputHandlers.employeeNumber.message;
    } else if (globalDisplay) {
      this.error.display = true;
      this.error.message = globalMessage;
    } else {
      this.error.display = false;
      this.error.message = '';
    }
  }

  private setEditingMode(inputHandler: InputHandler, isFocus: boolean) {
    if (
      !(
        (isFocus && inputHandler.editing) ||
        (!isFocus && inputHandler.editing && inputHandler.control.value)
      )
    ) {
      inputHandler.editing = isFocus;
    }
  }

  private validateModel(inputHandler: InputHandler) {
    // Defines if current input is invalid.
    inputHandler.invalid =
      inputHandler.control.dirty && inputHandler.control.invalid;

    // Defines displayed message
    if (inputHandler.invalid) {
      inputHandler.message = ERROR_MESSAGES.REQUIRED_FIELD;
    }

    this.updateErrorNotification();
  }

  private removeError(inputHandler: InputHandler) {
    inputHandler.invalid = false;

    this.updateErrorNotification();
  }

  /** –––
   *  –– Lifecycle hooks
   */

  /** –––
   *  –– Public methods
   */

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onInputFocus(inputHandler: InputHandler) {
    this.setEditingMode(inputHandler, true);
    this.removeError(inputHandler);
  }

  onInputBlur(inputHandler: InputHandler) {
    this.setEditingMode(inputHandler, false);
    this.validateModel(inputHandler);
  }

  setFocusedElement(element) {
    element.focus();
  }

  loginUser() {
    this.loggingUser = true;
    this.removeError(this.inputHandlers.networkUser);
    this.removeError(this.inputHandlers.employeeNumber);

    this.sessionService
      .createSession(
        this.loginForm.value.networkUser,
        this.loginForm.value.employeeNumber
      )
      .subscribe(
        session => {
          if (
            !session.user.hasRole(USER_ROLES.SPECIALIST.LABEL) &&
            session.user.hasRole(USER_ROLES.ADMINISTRATOR.LABEL)
          ) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/requests']);
          }
        },
        error => {
          this.loggingUser = false;
          switch (error.code) {
            case 404:
              this.inputHandlers.networkUser.invalid = true;
              this.inputHandlers.networkUser.message =
                ERROR_MESSAGES.INVALID_USER;
              break;
            case 403:
              this.inputHandlers.employeeNumber.invalid = true;
              this.inputHandlers.employeeNumber.message =
                ERROR_MESSAGES.INVALID_PASSWORD;
              break;
          }

          this.updateErrorNotification(true, ERROR_MESSAGES.UNEXPECTED_ERROR);
        }
      );
  }
}
