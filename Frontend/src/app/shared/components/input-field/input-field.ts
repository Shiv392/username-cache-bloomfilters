import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { LowercaseDirective } from '../../directives/lowercase.directive';

@Component({
  standalone: true,
  selector: 'app-input-field',
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, LowercaseDirective],
  templateUrl: './input-field.html',
  styleUrls: ['./input-field.css'],
})
export class InputField implements OnChanges {
  @Input() control: FormControl | null = null;
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() id = '';
  @Input() showPasswordToggle = false;
  @Input() loading? : boolean = false;
  @Input() lowercase = false;
  @Input() inputMsg?: string|null = null;
  @Input() msgType? : string = 'success';

  public passwordVisible = false;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['inputMsg']){
      console.log(this.inputMsg)
    }
  }

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
