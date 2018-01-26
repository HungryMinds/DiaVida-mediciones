/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform Imports
import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  forwardRef,
  Renderer,
  trigger,
  transition,
  state,
  animate,
  style
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

// App Imports
import { TAG_LIST_SELECT } from './tag-list-select.constants';
import { TagListSelectItem } from '../../interfaces';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         CONSTANTS DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

const TAG_LIST_SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TagListSelectComponent),
  multi: true
};

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         COMPONENT DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

@Component({
  moduleId: module.id,
  selector: 'tag-list-select',
  templateUrl: 'tag-list-select.component.html',
  styleUrls: ['tag-list-select.component.scss'],
  providers: [TAG_LIST_SELECT_VALUE_ACCESSOR],
  animations: [
    trigger('openState', [
      state(
        TAG_LIST_SELECT.STATE.OPEN,
        style({
          opacity: 1,
          'pointer-events': 'all',
          transform: 'scaleY(1)'
        })
      ),
      state(
        TAG_LIST_SELECT.STATE.CLOSE,
        style({
          opacity: 0,
          'pointer-events': 'none',
          transform: 'scaleY(0)'
        })
      ),
      transition(
        `${TAG_LIST_SELECT.STATE.CLOSE} <=> ${TAG_LIST_SELECT.STATE.OPEN}`,
        animate('.25s cubic-bezier(0.25, 0.8, 0.25, 1)')
      )
    ])
  ]
})
export class TagListSelectComponent implements ControlValueAccessor {
  /** –––
   *  –– Variables
   */
  private selectedItems: any[];
  private selectedIndeces: number[];
  private datasource: TagListSelectItem[];
  private isDataReady: boolean;
  private touched: boolean;
  private showHints: boolean;
  private datasourceIndeces: { [key: string]: number[] };
  private filteredIndeces: number[];
  private highlightedIndex: number;
  private storedCriteria: string;
  private disposeGlobalListener: Function;

  private onChangeHandler: (selectedItems: any[]) => any;
  private onTouchedHandler: () => any;

  public dropdownState: string;
  public searchCriteria: string;

  /** –––
   *  –– Inputs / Outputs
   */

  @ViewChild('dropdown') dropdownContainer: ElementRef;

  @Input() fixedItems: number[] = [];
  @Input() placeholder = 'Seleccionar';
  @Input()

  /** –––
   *  –– Getters / Setters
   */
  set data(datasource: TagListSelectItem[]) {
    this.isDataReady = datasource instanceof Array && !!datasource.length;

    this.datasource = datasource;

    // Makes items chuncks for improving search performance.
    this.datasource.forEach((item, index) => {
      const initialKeys = item.label
        .toLowerCase()
        .split(' ')
        .map(nameWord => nameWord[0] || '')
        .filter(
          (initialWord, wordIndex, array) =>
            initialWord && array.indexOf(initialWord) === wordIndex
        );

      initialKeys.forEach(initialKey => {
        const keyRecord = this.datasourceIndeces[initialKey];

        if (!keyRecord) {
          this.datasourceIndeces[initialKey] = [index];
        } else {
          keyRecord.push(index);
        }
      });
    });

    this.updateView();
  }

  get selectedValues() {
    return this.selectedIndeces.map(index => this.datasource[index]);
  }

  get availableValues() {
    return this.showHints
      ? this.filteredIndeces
          .filter(
            filteredIndex => this.selectedIndeces.indexOf(filteredIndex) < 0
          )
          .map(filteredIndex => this.datasource[filteredIndex])
          .filter(item => item.label.toLowerCase().match(this.storedCriteria))
      : [];
  }

  /** –––
   *  –– Constructor
   */

  constructor(private renderer: Renderer) {
    this.selectedItems = [];
    this.filteredIndeces = [];
    this.selectedIndeces = [];
    this.onChangeHandler = () => {};
    this.onTouchedHandler = () => {};
    this.dropdownState = TAG_LIST_SELECT.STATE.CLOSE;
    this.datasourceIndeces = {};
  }

  /** –––
   *  –– Helpers
   */

  private updateHighlightedIndex(isUp: boolean) {
    const hintsLength = this.availableValues.length;

    if (isUp && this.highlightedIndex > 0) {
      this.highlightedIndex--;
      this.updateDropdownScroll();
    } else if (!isUp && this.highlightedIndex < hintsLength - 1) {
      this.highlightedIndex++;
      this.updateDropdownScroll();
    }
  }

  private updateDropdownScroll() {
    const highlightedItem = this.dropdownContainer.nativeElement.children[
        this.highlightedIndex + 1
      ],
      scrollViewRange = {
        start: this.dropdownContainer.nativeElement.scrollTop,
        end:
          this.dropdownContainer.nativeElement.scrollTop +
          this.dropdownContainer.nativeElement.offsetHeight -
          TAG_LIST_SELECT.SCROLL.MARGIN
      };

    if (highlightedItem.offsetTop > scrollViewRange.end) {
      this.dropdownContainer.nativeElement.scrollTop = Math.min(
        this.dropdownContainer.nativeElement.scrollHeight -
          this.dropdownContainer.nativeElement.offsetHeight,
        scrollViewRange.start + TAG_LIST_SELECT.SCROLL.CHUNK
      );
    } else if (highlightedItem.offsetTop < scrollViewRange.start) {
      this.dropdownContainer.nativeElement.scrollTop = Math.max(
        0,
        scrollViewRange.start - TAG_LIST_SELECT.SCROLL.CHUNK
      );
    }
  }

  private updateView() {
    // Process selectedItems until data is set.
    if (this.isDataReady && this.selectedItems.length) {
      let foundCount = 0,
        foundSelectedItems = [];

      this.selectedIndeces = [];

      this.datasource.some((sourceItem, index) => {
        if (this.selectedItems.indexOf(sourceItem.id) !== -1) {
          this.selectedIndeces.push(index);
          foundSelectedItems.push(sourceItem.id);
          foundCount++;
        }
        return foundCount === this.selectedItems.length;
      });

      if (this.selectedItems.length !== foundSelectedItems.length) {
        this.selectedItems = foundSelectedItems;
        this.onChangeHandler(this.selectedItems);
      }
    }
  }

  private updateModel() {
    // Evaluates control and emit a value change.
    this.selectedItems = this.selectedIndeces.map(
      index => this.datasource[index].id
    );

    this.onChangeHandler(this.selectedItems);
  }

  /** –––
   *  –– ControlValueAccessor methods
   */

  writeValue(modelValue) {
    if (modelValue instanceof Array) {
      this.selectedItems = modelValue;

      this.updateView();
    }
  }

  registerOnChange(changeHandler: (selectedItems: any[]) => any) {
    this.onChangeHandler = changeHandler;
  }

  registerOnTouched(touchedHandler: () => any) {
    this.onTouchedHandler = touchedHandler;
  }

  /** –––
   *  –– Public methods
   */

  addItem(item: TagListSelectItem) {
    this.selectedIndeces.push(this.datasource.indexOf(item));

    this.updateModel();

    this.storedCriteria = '';
    this.searchCriteria = '';
    this.updateCriteriaHints(this.searchCriteria);
  }

  keyboardHandler(event) {
    if (this.showHints && this.availableValues.length) {
      switch (event.keyCode) {
        case 13:
          this.addItem(this.availableValues[this.highlightedIndex]);
          break;
        case 38:
        case 40:
          this.updateHighlightedIndex(event.keyCode < 40);
          break;
      }
    }
  }

  removeItem(selectedItemIndex: number) {
    this.selectedIndeces.splice(selectedItemIndex, 1);

    this.updateModel();

    this.onTouchedHandler();
  }

  updateCriteriaHints(searchCriteria) {
    searchCriteria = searchCriteria.toLowerCase();

    if (searchCriteria.length >= 1) {
      if (
        !this.showHints ||
        (this.showHints && searchCriteria[0] !== this.storedCriteria[0])
      ) {
        this.filteredIndeces = this.datasourceIndeces[searchCriteria[0]];
        this.dropdownState = TAG_LIST_SELECT.STATE.OPEN;
        this.showHints = true;
      }
    } else {
      this.closeSelection();
    }

    this.highlightedIndex = 0;
    this.storedCriteria = searchCriteria;
  }

  setHighlightedIndex(itemIndex) {
    this.highlightedIndex = itemIndex;
  }

  isHighlightedIndex(itemIndex) {
    return this.highlightedIndex === itemIndex;
  }

  isFixedItem(item: TagListSelectItem) {
    return this.fixedItems.indexOf(item.id) !== -1;
  }

  stopPropagation($event) {
    $event.stopPropagation();
  }

  onInputFocus() {
    if (this.storedCriteria) {
      this.showHints = true;
      this.dropdownState = TAG_LIST_SELECT.STATE.OPEN;
    }
    this.disposeGlobalListener = this.renderer.listenGlobal(
      'body',
      'click',
      () => this.closeSelection()
    );

    this.onTouchedHandler();
  }

  closeSelection() {
    this.showHints = false;
    this.disposeGlobalListener();
    this.dropdownState = TAG_LIST_SELECT.STATE.CLOSE;
  }
}
