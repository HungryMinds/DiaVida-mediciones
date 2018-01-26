/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform Imports
import { Injectable } from '@angular/core';

// App Imports
import { SACAPIService } from '../sac-api/sac-api.service';
import { SessionService } from '../../../core/services';
import { RequestType } from '../../models';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••           SERVICE DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
@Injectable()
export class RequestTypeService {
  constructor(
    private sacapiService: SACAPIService,
    private sessionService: SessionService
  ) {}

  private createHeaders() {
    const session = this.sessionService.getCurrent();
    return { customHeaders: { Authorization: session.token } };
  }
  /** –––
   *  –– Public Methods
   */

  getRequestTypes() {
    const session = this.sessionService.getCurrent();
    return this.sacapiService
      .get(
        `/area/${session.user.getSelectedArea().id}/requesttypes`,
        this.createHeaders()
      )
      .catch(this.sessionService.checkAuthenticatedInterceptor());
  }

  getRequestType(requestTypeId) {
    const session = this.sessionService.getCurrent();
    return this.sacapiService
      .get(`/requesttypes/${requestTypeId}`, this.createHeaders())
      .map(response => new RequestType(response))
      .catch(this.sessionService.checkAuthenticatedInterceptor());
  }

  createRequestType(requestTypeModel, categoryIndex) {
    const session = this.sessionService.getCurrent();

    requestTypeModel.categoryId = categoryIndex;

    return this.sacapiService
      .post(`/requesttypes`, requestTypeModel, this.createHeaders())
      .catch(this.sessionService.checkAuthenticatedInterceptor());
  }

  updateRequestType(requestTypeId, requestTypeModel) {
    const session = this.sessionService.getCurrent();
    requestTypeModel.questions.deleted = requestTypeModel.questions.deleted.map(
      deletedQuestion => deletedQuestion.id
    );

    return this.sacapiService
      .put(
        `/requesttypes/${requestTypeId}`,
        requestTypeModel,
        this.createHeaders()
      )
      .catch(this.sessionService.checkAuthenticatedInterceptor());
  }

  deleteRequestType(requestTypeId) {
    const session = this.sessionService.getCurrent();
    return this.sacapiService
      .delete(`/requesttypes/${requestTypeId}`, {}, this.createHeaders())
      .catch(this.sessionService.checkAuthenticatedInterceptor());
  }
}
