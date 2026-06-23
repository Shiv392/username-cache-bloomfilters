import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-button',
  imports: [CommonModule, ButtonModule],
  templateUrl: './button.html',
  styleUrls: ['./button.css'],
})
export class Button {
  @Input() label = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled? : boolean;
  @Input() styleClass = '';
  @Output() clicked = new EventEmitter<MouseEvent>();

  emitClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }
}
