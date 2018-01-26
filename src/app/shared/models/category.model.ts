/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
import { Category as ICategory, RequestType } from '../interfaces';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         MODEL IMPLEMENTATION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

export class Category implements ICategory {
  private sortedSpecialists: { added: number[]; deleted: number[] };
  public id: number;
  public label: string;
  public removable: boolean;
  public specialists: { id: number; removable: boolean }[];
  public requestTypes: RequestType[];

  public removed: boolean;

  constructor(dataObject?: any) {
    this.id = (dataObject && dataObject.id) || null;
    this.label = (dataObject && dataObject.label) || '';
    this.removable =
      dataObject === undefined
        ? true
        : dataObject.removable === undefined || dataObject.removable;
    this.requestTypes =
      (dataObject && <RequestType[]>dataObject.requestTypes) || [];
    this.specialists = (dataObject && dataObject.specialists) || [];

    this.removed = false;
    this.sortedSpecialists = { added: [], deleted: [] };
  }

  setRemoved() {
    this.removed = true;
  }
  getSortedSpecialists() {
    return this.sortedSpecialists;
  }
}
