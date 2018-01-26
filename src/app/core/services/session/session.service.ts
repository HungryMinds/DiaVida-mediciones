/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform Imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// App Imports
import { SACAPIService } from '../../../shared/services/sac-api/sac-api.service';
import { LocalStorageService } from '../../../shared/services/local-storage/local-storage.service';

import { User } from '../../../shared/models';
import { Session } from './session.interface';

// Rxjs Imports
import { Observable } from 'rxjs/Observable';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••           SERVICE DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
@Injectable()
export class SessionService {
  /** –––
   *  –– Constants
   */
  private STORAGE_KEY = 'QZYMAQRMK';

  /** –––
   *  –– Variables
   */
  private sessionBackup: Session;
  private session: Session;

  /** –––
   *  –– Constructor
   */
  constructor(
    private router: Router,
    private sacapiService: SACAPIService,
    private localStorageService: LocalStorageService
  ) {}

  /** –––
   *  Helper Methods
   */

  private createLocalReference(responseObject: any): Session {
    const user: User =
        responseObject.user instanceof User
          ? responseObject.user
          : new User(responseObject),
      session = <Session>{ user, token: responseObject.token };

    // Stores created session in localStorage.
    const storeResult = this.localStorageService.storeValue(
      this.STORAGE_KEY,
      session
    );

    if (!storeResult) {
      console.error('Session was not stored');
    }

    return session;
  }

  /** –––
   *  –– Public Methods
   */

  createSession(username: string, password: string) {
    return this.sacapiService
      .post('/user', { username, password })
      .map(response => {
        this.session = this.createLocalReference(response);
        this.sessionBackup = this.session;
        return this.session;
      });
  }

  getCurrent() {
    // If session is not defined look at localSotrage value.
    if (!this.session) {
      this.session = <Session>this.localStorageService.getValue(
        this.STORAGE_KEY
      );
      if (this.session) {
        this.session.user = new User(this.session.user);
        this.sessionBackup = this.session;
      }
    }

    return this.session;
  }

  destroySession() {
    // First remove stored value.
    const removeResult = this.localStorageService.removeValue(this.STORAGE_KEY);

    if (this.session) {
      this.session = undefined;
    }
  }

  restoreSession() {
    this.session = this.createLocalReference(this.sessionBackup);
  }

  checkAuthenticatedInterceptor() {
    const sessionService = this;
    return function(error) {
      if (error.code === 401) {
        sessionService.destroySession();
        sessionService.router.navigate(['login']);
      }
      return Observable.throw(error);
    };
  }
}
