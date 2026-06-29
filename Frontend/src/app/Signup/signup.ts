import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { InputField } from '../shared/components/input-field/input-field';
import { Button } from '../shared/components/button/button';
import { NotificationService } from '../shared/services/notification.service';
import { debounceTime, Subject, takeUntil, throttleTime } from 'rxjs';
import { SignupService } from './services/Signup.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputField, Button],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class Signup implements OnInit, OnDestroy {

  private fb = inject(FormBuilder);
  private notificationService = inject(NotificationService);
  private SignupService = inject(SignupService);

  public submitted = false;
  public submittedMessage = '';

  public signupForm: FormGroup;

  public userNameLoader : boolean = false;
  public userNameError : string|null = null;
  public userNameMsg : string | null = null;
  public userNameMsgType : string = 'success';

  public loading: boolean = false;

  public subject$ = new Subject<void>();

  constructor() {
    this.signupForm = this.fb.group({
      userEmail : ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      userName : ['', [Validators.required]],
      password : ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    this.signupForm.controls['userName'].valueChanges.pipe(takeUntil(this.subject$), debounceTime(500))
    .subscribe(res=> this.handleUserNameChange(res));
  }

  public handleUserNameChange(username : string){
    this.userNameError = null;
    this.userNameMsg = null;

    if(!username || username.trim().length==0) return;

    username = username.trim().toLowerCase();

    this.userNameLoader = true;
    this.SignupService.ValidateUserName({username : username}).subscribe({
      next : (res)=>{
        this.userNameLoader = false;
        if(res.message){
          this.userNameMsg = res.message;
          this.userNameMsgType = 'success';
        }
        else{
          
          this.userNameMsg = res.error;
          this.userNameMsgType = 'error';
        }
      }
    })
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

    this.loading = true;
    const apibody = {
      "username": this.signupForm.value.userName,
      "email" : this.signupForm.value.userEmail,
      "password" : this.signupForm.value.password
    }

    console.log("apibody------->", apibody);
    this.SignupService.validateSignup(apibody).subscribe({
      next : (res)=>{
        this.loading = false;
        this.notificationService.showSuccess({summary : "Success", detail : res.message});
      },
      error : ()=>{
        this.loading = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }
}
