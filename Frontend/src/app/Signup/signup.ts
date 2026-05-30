import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, 
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule
  ],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class Signup implements OnInit {

  private fb = inject(FormBuilder);
  public submitted = false;
  public submittedMessage = '';

  public signupForm: FormGroup;

  constructor() {
    this.signupForm = this.fb.group({
      userEmail : ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      userName : ['', [Validators.required]],
      password : ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
  }

  get userEmail() {
    return this.signupForm.get('userEmail');
  }

  get userName() {
    return this.signupForm.get('userName');
  }

  get password() {
    return this.signupForm.get('password');
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      this.submittedMessage = '';
      return;
    }

    this.submittedMessage = `Welcome, ${this.userName?.value}! Your account is ready to be created.`;
  }
}
