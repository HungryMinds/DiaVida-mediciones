/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform imports
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Renderer,
  state,
  style,
  transition,
  animate,
  trigger
} from '@angular/core';

import { CUSTOM_SELECT } from './custom-select.constants';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         COMPONENT DECLARATION         •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
@Component({
  moduleId: module.id,
  selector: 'custom-select',
  templateUrl: 'custom-select.component.html',
  styleUrls: ['custom-select.component.scss'],
  animations: [
    trigger('openState', [
      state(
        CUSTOM_SELECT.STATE.OPEN,
        style({
          opacity: 1,
          'pointer-events': 'all',
          transform: 'scaleY(1)'
        })
      ),
      state(
        CUSTOM_SELECT.STATE.CLOSE,
        style({
          opacity: 0,
          'pointer-events': 'none',
          transform: 'scaleY(0)'
        })
      ),
      transition(
        `${CUSTOM_SELECT.STATE.CLOSE} <=> ${CUSTOM_SELECT.STATE.OPEN}`,
        animate('.25s cubic-bezier(0.25, 0.8, 0.25, 1)')
      )
    ])
  ]
})
export class CustomSelectComponent implements OnInit {
  /** –––
   *  –– Variables
   */

  private _datasource: any[];
  private _fixedIndex: number;
  private _fixedId: number;
  private _selectedId: number | number[];
  private _selectedIndex: number;
  private disposeGlobalListener;

  public multipleSelection: boolean;
  public dropdownState: string;

  /** –––
   *  –– Getters / Setters
   */
  public;
  get fixedItem() {
    return this._fixedIndex !== null && this._datasource[this._fixedIndex];
  }
  get dynamicItems() {
    return this._fixedIndex !== null
      ? Array.prototype.concat.apply(
          this._datasource.slice(0, this._fixedIndex),
          this._datasource.slice(this._fixedIndex + 1)
        )
      : this._datasource;
  }

  set selectedItem(item: any) {
    this.multipleSelection = false;
    this._selectedIndex = null;

    if (item) {
      this._datasource.forEach((sourceItem, index) => {
        sourceItem.selected = sourceItem[this.itemId] === item[this.itemId];
        if (sourceItem.selected) {
          this._selectedIndex = index;
        }
      });
    } else {
      this._datasource.forEach(item => (item.selected = false));
    }
  }
  get selectedItem() {
    return (
      this._selectedIndex !== null && this._datasource[this._selectedIndex]
    );
  }

  @Input() itemId = 'id';

  @Input()
  set data(datasource: any[]) {
    this._datasource = datasource || [];

    // Recalculates defined selections.
    if (!this._selectedIndex && this._selectedId) {
      this.selectedId = this._selectedId;
    }
    this.fixedId = this._fixedId;
  }
  get data() {
    return this._datasource;
  }

  @Input()
  set fixedId(newFixedId: number) {
    this._fixedIndex = null;
    this._fixedId = newFixedId;

    this._datasource.some((item, index) => {
      const matchedValue = newFixedId === item[this.itemId];

      if (matchedValue) {
        this._fixedIndex = index;
      }
      return matchedValue;
    });
  }

  @Input()
  set selectedId(id: number | number[]) {
    this._selectedId = id;
    this.multipleSelection = id instanceof Array;
    this._selectedIndex = null;

    if (this.multipleSelection) {
      this.data.forEach(item => (item.selected = false));
    } else {
      this.data.forEach((item, index) => {
        item.selected = item[this.itemId] === id;
        if (item.selected) {
          this._selectedIndex = index;
        }
      });
    }
  }

  @Output()
  change: EventEmitter<{
    selectedIndex: number;
    selectedItem: any;
  }> = new EventEmitter<{ selectedIndex: number; selectedItem: any }>();

  /** –––
   *  –– Constructor
   */
  constructor(private renderer: Renderer) {}

  /** –––
   *  –– Lifecycle hooks
   */
  ngOnInit() {
    this.dropdownState = CUSTOM_SELECT.STATE.CLOSE;
  }

  /** –––
   *  –– Helper functions
   */

  /** –––
   *  –– Public functions
   */

  toggleDropdown($event) {
    if (this.dropdownState === CUSTOM_SELECT.STATE.CLOSE) {
      $event.stopPropagation();
      this.disposeGlobalListener = this.renderer.listenGlobal(
        'body',
        'click',
        $event => this.toggleDropdown($event)
      );

      this.dropdownState = CUSTOM_SELECT.STATE.OPEN;
    } else {
      this.disposeGlobalListener();
      this.dropdownState = CUSTOM_SELECT.STATE.CLOSE;
    }
  }

  selectItem(item) {
    this.selectedItem = item;
    this.change.emit({
      selectedIndex: this._selectedIndex,
      selectedItem: this.selectedItem
    });
  }
}
