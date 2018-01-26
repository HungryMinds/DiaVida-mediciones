/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

import { Question } from './';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         INTERFACE DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

export interface RequestType {
  id: number;
  label: string;
  removable: boolean;
  isQuery: boolean;
  questions: Question[];
  message: string;
  responseTime: number;
  categoryId: number;
}
