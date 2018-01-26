/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
import { Area } from './';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         INTERFACE DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

export interface User {
  id: number;
  name: string;
  lastname: string;
  username: string;
  roles: string[];
  categories: number[];
  areas: Area[];

  getFullName(): string;
  getSelectedArea(): Area;
  hasRole(requestedRole: string): boolean;
}
