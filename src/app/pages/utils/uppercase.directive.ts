import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]',
  standalone: true
})
export class UppercaseDirective {
  constructor(private control: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    if (this.control && this.control.control) {
      this.control.control.setValue(value.toUpperCase(), { emitEvent: false });
    }
  }
}
