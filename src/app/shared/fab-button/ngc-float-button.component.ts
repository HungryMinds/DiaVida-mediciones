/* created by @GustavoCostaW https://github.com/gustavocostaw/ngc-float-button  */

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgcFloatItemButtonComponent } from './ngc-float-item-button.component';
import {
  Component,
  Input,
  ContentChildren,
  ElementRef,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterContentInit,
  OnDestroy,
  Output,
  OnChanges
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ngc-float-button',
  styleUrls: ['./ngc-float-button.component.scss'],
  templateUrl: './ngc-float-button.component.html'
})
export class NgcFloatButtonComponent
  implements AfterContentInit, OnDestroy, OnChanges {
  private elementref: HTMLElement;
  private subs: Subscription[] = [];
  public state: BehaviorSubject<any>;

  @Input() icon: string;
  @Input() direction: string;
  @Input() spaceBetweenButtons = 65;
  @Input() open: Subject<boolean>;
  @Input() color = '#dd0031';
  @Input() disabled = false;
  @Output() events: Subject<any> = new Subject();
  @ContentChildren(NgcFloatItemButtonComponent) buttons;

  constructor(private element: ElementRef, private cd: ChangeDetectorRef) {
    this.elementref = element.nativeElement;

    this.state = new BehaviorSubject({
      display: false,
      direction: 'top',
      event: 'start',
      spaceBetweenButtons: this.spaceBetweenButtons
    });
  }

  public toggle() {
    if (this.disabled) {
      return this.disabled;
    }
    this.state.next({
      ...this.state.getValue(),
      display: !this.state.getValue().display,
      event: !this.state.getValue().display ? 'open' : 'close'
    });
  }

  // only top and bottom support content element
  private checkDirectionType() {
    if (this.buttons.toArray()) {
      let display = 'block';

      if (this.direction === 'right' || this.direction === 'left') {
        display = 'none';
      }

      this.buttons.toArray().forEach(element => {
        element.contentref.nativeElement.style.display = display;
      });
    }
  }

  // transition
  private animateButtons(eventType) {
    this.buttons.toArray().forEach((btn, i) => {
      i += 1;
      const style = btn.elementref.nativeElement.style;

      if (eventType !== 'directionChanged' && this.state.getValue().display) {
        style['transform'] = 'scale(1)';
        style['transition-duration'] = '0s';

        if (btn.timeout) {
          clearTimeout(btn.timeout);
        }
      }

      setTimeout(() => {
        style['transition-duration'] = this.state.getValue().display
          ? `${90 + 100 * i}ms`
          : '';
        style['transform'] = this.state.getValue().display
          ? this.getTranslate(i)
          : '';
      }, 50);

      if (eventType !== 'directionChanged' && !this.state.getValue().display) {
        btn.timeout = setTimeout(() => {
          style['transform'] = 'scale(0)';
        }, 90 + 100 * i);
      }
    });
  }

  // get transition direction
  private getTranslate(i) {
    let animation;

    switch (this.direction) {
      case 'right':
        animation = `translate3d(${this.state.getValue().spaceBetweenButtons *
          i}px,0,0)`;
        break;
      case 'bottom':
        animation = `translate3d(0,${this.state.getValue().spaceBetweenButtons *
          i}px,0)`;
        break;
      case 'left':
        animation = `translate3d(-${this.state.getValue().spaceBetweenButtons *
          i}px,0,0)`;
        break;
      default:
        animation = `translate3d(0,-${this.state.getValue()
          .spaceBetweenButtons * i}px,0)`;
        break;
    }

    return animation;
  }

  /* some problems here */
  // @HostListener('document:click', ['$event.target']) private clickOutside(target) {
  //   if (this.state.getValue().display && !this.elementref.contains(target)) {
  //     this.state.next({
  //       ...this.state.getValue(),
  //       display: false,
  //       event: 'close'
  //     });
  //   }
  // }

  ngAfterContentInit() {
    if (this.direction) {
      // first time to check
      this.checkDirectionType();
    }

    this.buttons.toArray().map(v => {
      const _sub = v.clicked.subscribe(() => {
        this.state.next({
          ...this.state.getValue(),
          display: false,
          event: 'close'
        });
      });

      this.subs.push(_sub);
    });

    const sub = this.state.subscribe(v => {
      this.animateButtons(v.event);

      this.events.next({
        display: v.display,
        event: v.event,
        direction: v.direction
      });
    });
    this.subs.push(sub);
  }

  // if @Input values changes, we need check the direction type
  ngOnChanges(changes) {
    if (changes.direction && !changes.direction.firstChange) {
      this.state.next({
        ...this.state.getValue(),
        event: 'directionChanged',
        direction: changes.direction.currentValue
      });
      // if changes happens
      this.checkDirectionType();
    }

    if (changes.open && changes.open.currentValue) {
      const sub = this.open.subscribe(v => {
        if (v !== this.state.getValue().display) {
          this.state.next({
            ...this.state.getValue(),
            event: v ? 'open' : 'close',
            display: v
          });

          // make angular happy
          this.cd.markForCheck();
        }
      });

      this.subs.push(sub);
    }

    if (
      changes.spaceBetweenButtons &&
      changes.spaceBetweenButtons.currentValue
    ) {
      this.state.next({
        ...this.state.getValue(),
        event: 'spaceBetweenButtonsChanged',
        spaceBetweenButtons: changes.spaceBetweenButtons.currentValue
      });
    }
  }

  ngOnDestroy() {
    this.subs.forEach(v => {
      v.unsubscribe();
    });
  }
}
