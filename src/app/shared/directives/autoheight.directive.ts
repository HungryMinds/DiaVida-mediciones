/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
import {
  ElementRef,
  HostListener,
  Directive,
  AfterContentChecked
} from '@angular/core';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         DIRECTIVE DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
@Directive({
  selector: 'textarea[autoheight]'
})
export class AutoHeightDirective implements AfterContentChecked {
  /** –––
   *  –– Listeners
   */
  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  /** –––
   *  –– Constructor
   */
  constructor(public element: ElementRef) {}

  /** –––
   *  –– Lifecyle hooks
   */
  ngAfterContentChecked(): void {
    this.adjust();
  }

  /** –––
   *  –– Public Methods
   */
  adjust(): void {
    this.element.nativeElement.style.height = 'auto';
    this.element.nativeElement.style.height =
      this.element.nativeElement.scrollHeight + 'px';
  }
}
