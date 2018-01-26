/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
import { User as IUser, Area } from '../interfaces';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         MODEL IMPLEMENTATION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

export class User implements IUser {
  private _selectedArea: number;
  public id: number;
  public name: string;
  public lastname: string;
  public username: string;
  public roles: string[];
  public areas: Area[];
  public categories: number[];

  constructor(dataObject: any) {
    this.id = dataObject.id || null;
    this.name = dataObject.name || '';
    this.lastname = dataObject.lastname || '';
    this.username = dataObject.username || '';
    this.roles = dataObject.roles instanceof Array ? dataObject.roles : [];
    this.areas = dataObject.areas || [];
    this.categories = (dataObject && dataObject.categories) || [];

    this._selectedArea = this.areas.length ? 0 : null;
  }

  getFullName() {
    return `${this.name} ${this.lastname}`;
  }
  getSelectedArea() {
    return this.areas.length ? this.areas[this._selectedArea] : null;
  }
  hasRole(requestedRole: string) {
    return this.roles.indexOf(requestedRole) !== -1;
  }
}
