/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
import { Category } from './';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         INTERFACE DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

export interface Area {
  id: number;
  label: string;
  active: boolean;
  removable: boolean;

  categories: Category[];
}
