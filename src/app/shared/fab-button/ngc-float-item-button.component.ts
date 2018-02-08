/* created by @GustavoCostaW https://github.com/gustavocostaw/ngc-float-button  */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'ngc-float-item-button',
  styleUrls: ['./ngc-float-item-buttom.component.scss'],
  templateUrl: './ngc-float-item-buttom.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgcFloatItemButtonComponent {
  @Input() icon: string;
  @Input() image = '';
  @Input() content: string;
  @Input() color = 'white';
  @Output() clicked: EventEmitter<any> = new EventEmitter();
  @Input() disabled = false;
  @ViewChild('elementref') elementref;
  @ViewChild('contentref') contentref;

  emitClickEvent($event: Event) {
    if (this.disabled) {
      return this.disabled;
    }

    this.clicked.emit($event);
  }
}
