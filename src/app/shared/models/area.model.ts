/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
import { Area as IArea } from '../interfaces';
import { Category } from './category.model';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         MODEL IMPLEMENTATION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

export class Area implements IArea {
  private sortedCategories: {
    added: Category[];
    updated: Category[];
    deleted: Category[];
  };

  public id: number;
  public label: string;
  public removable: boolean;
  public active: boolean;
  public categories: Category[];

  public expanded: boolean;
  public removed: boolean;

  constructor(dataObject?: any) {
    this.id = (dataObject && dataObject.id) || null;
    this.label = (dataObject && dataObject.label) || '';
    this.active =
      dataObject === undefined
        ? true
        : dataObject.active === null || dataObject.active;
    this.removable =
      dataObject === undefined
        ? true
        : dataObject.removable === undefined || dataObject.removable;
    this.categories =
      (dataObject &&
        dataObject.categories.map(category => new Category(category))) ||
      [];

    this.expanded = false;
    this.removed = false;
    this.sortedCategories = { added: [], updated: [], deleted: [] };
  }

  setRemoved() {
    this.removed = true;
  }
  toggleContent() {
    this.expanded = !this.expanded;
  }

  getSortedCategories() {
    return this.sortedCategories;
  }
  setSortedCategories(sortedCategories: {
    added: Category[];
    updated: Category[];
    deleted: Category[];
  }) {
    this.sortedCategories = sortedCategories;
  }
}
