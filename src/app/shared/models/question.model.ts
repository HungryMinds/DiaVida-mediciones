/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
import { Question as IQuestion, QuestionType } from '../interfaces';
import { QUESTION_TYPES } from '../shared.constants';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         MODEL IMPLEMENTATION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

export class Question implements IQuestion {
  public id: number;
  public text: string;
  public type: QuestionType;
  public active: boolean;

  constructor(dataObject?: any) {
    this.id = (dataObject && dataObject.id) || null;
    this.text = (dataObject && dataObject.text) || '';
    this.type = (dataObject && dataObject.type) || QUESTION_TYPES.TEXT;
    this.active =
      dataObject === undefined
        ? true
        : dataObject.active === null || dataObject.active;
  }
}
