/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
import { RequestType as IRequestType } from '../interfaces';
import { Question } from './question.model';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         MODEL IMPLEMENTATION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

export class RequestType implements IRequestType {
  public id: number;
  public label: string;
  public removable: boolean;
  public isQuery: boolean;
  public categoryId: number;
  public questions: Question[];

  public message: string;
  public responseTime: number;

  constructor(dataObject?: any) {
    this.id = (dataObject && dataObject.id) || null;
    this.label = (dataObject && dataObject.label) || '';
    this.isQuery = (dataObject && dataObject.isQuery) || false;
    this.categoryId = (dataObject && dataObject.categoryId) || null;
    this.removable =
      dataObject === undefined
        ? true
        : dataObject.removable === undefined || dataObject.removable;

    this.questions =
      (dataObject &&
        dataObject.questions &&
        dataObject.questions.map(question => new Question(question))) ||
      [];

    this.message = (dataObject && dataObject.message) || '';
    this.responseTime = (dataObject && dataObject.responseTime) || 0;
  }
}
