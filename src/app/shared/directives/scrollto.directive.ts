/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
import {
  ElementRef,
  Directive,
  Input,
  Renderer,
  ContentChild,
  AfterContentInit
} from '@angular/core';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         DIRECTIVE DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
@Directive({
  selector: '[scrollTo]'
})
export class ScrollToDirective {
  /** –––
   *  –– Inputs/Outputs
   */
  @Input() scrollTo: string;
  @Input()
  set applyScroll(value: any) {
    if (value !== undefined) {
      this.scrollToChild();
    }
  }

  /** –––
   *  –– Constructor
   */
  constructor(private element: ElementRef) {}

  /** –––
   *  –– Helper Methods
   */

  scrollAnimation(scrollDuration, scrollTo, scrollableElement) {
    let scrollCount = 0,
      baseScrollTop = scrollableElement.scrollTop,
      maxScroll =
        scrollableElement.scrollHeight - scrollableElement.clientHeight,
      oldTimestamp = performance.now();

    function step(newTimestamp) {
      scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));

      if (scrollCount >= Math.PI) {
        scrollableElement.scrollTop = scrollTo;
      }
      if (scrollableElement.scrollTop >= maxScroll) {
        return;
      }

      scrollableElement.scrollTop =
        baseScrollTop + Math.round(scrollTo - scrollTo * Math.cos(scrollCount));
      oldTimestamp = newTimestamp;

      window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }
  scrollToChild(): void {
    let scrollableElement = this.element.nativeElement,
      targetElement = scrollableElement.querySelector(this.scrollTo),
      offsetDifference = 0;

    if (targetElement) {
      const scrollableTopOffset = scrollableElement.offsetTop,
        targetTopOffset = targetElement.offsetTop;

      offsetDifference = Math.abs(targetTopOffset - scrollableTopOffset);
    }
    this.scrollAnimation(
      460,
      offsetDifference - scrollableElement.scrollTop,
      scrollableElement
    );
  }
}
