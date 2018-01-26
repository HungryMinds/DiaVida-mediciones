/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform Imports
import { Injectable } from '@angular/core';

// App Imports
import { SACAPIService } from '../sac-api/sac-api.service';
import { SessionService } from '../../../core/services';
import { User } from '../../models';
import { USER_ROLES } from '../../shared.constants';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••           SERVICE DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
@Injectable()
export class UserService {
  constructor(
    private sacapiService: SACAPIService,
    private sessionService: SessionService
  ) {}

  /** –––
   *  –– Public Methods
   */

  getUsers() {
    const session = this.sessionService.getCurrent();

    return this.sacapiService
      .get(
        `/areas/${session.user.getSelectedArea().id}/users/roles/${
          USER_ROLES.SPECIALIST.ID
        }`,
        { customHeaders: { Authorization: session.token } }
      )
      .map(users => users.map(user => new User(user)))
      .catch(this.sessionService.checkAuthenticatedInterceptor());
  }

  getAllUsers() {
    const session = this.sessionService.getCurrent();

    return this.sacapiService
      .get('/users', { customHeaders: { Authorization: session.token } })
      .catch(this.sessionService.checkAuthenticatedInterceptor());
  }
}
