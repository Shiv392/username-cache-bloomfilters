import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[lowercase]',
  standalone: true,
})
export class LowercaseDirective {
  @Input() lowercase = true;

  constructor(private readonly elementRef: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    if (!this.lowercase) {
      return;
    }
    const input = event.target as HTMLInputElement | null;
    if (!input) {
      return;
    }
    this.applyLowercase(input.value);
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();

    const clipboardText = event.clipboardData?.getData('text') ?? '';
    const input = this.elementRef.nativeElement;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;
    const lowerText = clipboardText.toLowerCase();

    input.value = input.value.slice(0, start) + lowerText + input.value.slice(end);
    const cursorPosition = start + lowerText.length;
    input.setSelectionRange(cursorPosition, cursorPosition);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  private applyLowercase(value: string): void {
    const lowerValue = value?.toLowerCase() ?? '';
    const input = this.elementRef.nativeElement;
    if (input.value !== lowerValue) {
      input.value = lowerValue;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}
