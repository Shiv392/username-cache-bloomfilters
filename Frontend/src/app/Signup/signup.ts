import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { InputField } from '../shared/components/input-field/input-field';
import { Button } from '../shared/components/button/button';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputField, Button],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class Signup implements OnInit {

  private fb = inject(FormBuilder);
  public submitted = false;
  public submittedMessage = '';

  public signupForm: FormGroup;

  public userNameLoader : boolean = false;

  constructor() {
    this.signupForm = this.fb.group({
      userEmail : ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      userName : ['', [Validators.required]],
      password : ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
  }

  get userEmail(): FormControl {
    return this.signupForm.get('userEmail') as FormControl;
  }

  get userName(): FormControl {
    return this.signupForm.get('userName') as FormControl;
  }

  get password(): FormControl {
    return this.signupForm.get('password') as FormControl;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.submittedMessage = `Welcome, ${this.userName?.value}! Your account is ready to be created.`;
  }
}
