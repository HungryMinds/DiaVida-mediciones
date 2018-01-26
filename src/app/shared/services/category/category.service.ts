/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform Imports
import { Injectable } from '@angular/core';

// App Imports
import { SACAPIService } from '../sac-api/sac-api.service';
import { SessionService } from '../../../core/services';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••           SERVICE DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
@Injectable()
export class CategoryService {
  constructor(
    private sacapiService: SACAPIService,
    private sessionService: SessionService
  ) {}

  /** –––
   *  –– Public Methods
   */

  getCategories() {
    const session = this.sessionService.getCurrent();
    return this.sacapiService
      .get(`/area/${session.user.getSelectedArea().id}/categories`, {
        customHeaders: { Authorization: session.token }
      })
      .catch(this.sessionService.checkAuthenticatedInterceptor());
  }
}
