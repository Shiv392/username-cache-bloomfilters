import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  standalone: true,
  selector: 'app-input-field',
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, FloatLabelModule],
  templateUrl: './input-field.html',
  styleUrls: ['./input-field.css'],
})
export class InputField {
  @Input() control: FormControl | null = null;
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() id = '';
  @Input() showPasswordToggle = false;
  @Input() loading? : boolean = false;

  public passwordVisible = false;

  get currentType(): string {
    if (this.showPasswordToggle && this.type === 'password') {
      return this.passwordVisible ? 'text' : 'password';
    }
    return this.type;
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
