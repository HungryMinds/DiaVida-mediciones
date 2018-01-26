/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
import { RequestType } from './';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         INTERFACE DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

export interface Category {
  id: number;
  label: string;
  removable: boolean;
  specialists: { id: number; removable: boolean }[];
  requestTypes: RequestType[];
}
