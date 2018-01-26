/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform Imports
import { Injectable } from '@angular/core';

// Rxjs imports
import { Observable } from 'rxjs/Observable';

// App Imports
import { SACAPIService } from '../sac-api/sac-api.service';
import { SessionService } from '../../../core/services';
import { Area } from '../../../shared/models';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••           SERVICE DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
@Injectable()
export class AreaService {
  constructor(
    private sacapiService: SACAPIService,
    private sessionService: SessionService
  ) {}

  /** –––
   *  –– Public Methods
   */

  getAreas() {
    const session = this.sessionService.getCurrent();
    return this.sacapiService
      .get(`/area`, { customHeaders: { Authorization: session.token } })
      .map(areas => areas.map(area => new Area(area)))
      .catch(this.sessionService.checkAuthenticatedInterceptor());
  }

  createAreas(areasCollection) {
    const session = this.sessionService.getCurrent(),
      data = areasCollection.map(area => ({
        label: area.label,
        active: area.active,
        categories: area.categories.map(category => ({
          label: category.label,
          specialists: category.getSortedSpecialists().added
        }))
      }));

    return this.sacapiService
      .post(
        `/area`,
        { areas: data },
        { customHeaders: { Authorization: session.token } }
      )
      .map(areas => areas.map(area => new Area(area)))
      .catch(this.sessionService.checkAuthenticatedInterceptor());
  }

  updateAreas(areasCollection: Area[]) {
    const session = this.sessionService.getCurrent(),
      data = areasCollection.map(area => {
        const sortedCategories = area.getSortedCategories(),
          added = sortedCategories.added.map(category => ({
            label: category.label,
            specialists: category.getSortedSpecialists().added
          })),
          updated = sortedCategories.updated.map(category => ({
            id: category.id,
            label: category.label,
            specialists: category.getSortedSpecialists()
          })),
          deleted = sortedCategories.deleted.map(category => category.id);

        return {
          id: area.id,
          label: area.label,
          active: area.active,
          categories: { added, updated, deleted }
        };
      });

    return this.sacapiService
      .put(
        `/area`,
        { areas: data },
        { customHeaders: { Authorization: session.token } }
      )
      .map(areas => areas.map(area => new Area(area)))
      .catch(this.sessionService.checkAuthenticatedInterceptor());
  }

  removeAreas(areasCollection) {
    const session = this.sessionService.getCurrent(),
      data = areasCollection.map(area => area.id);

    return this.sacapiService
      .delete(
        `/area`,
        { areas: data },
        { customHeaders: { Authorization: session.token } }
      )
      .catch(this.sessionService.checkAuthenticatedInterceptor());
  }
}
