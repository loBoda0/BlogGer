import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  signupForm: FormGroup
  formState: string
  sub: Subscription

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.authService.formState.subscribe((value) => {
      if (value === 'registered') {
        this.router.navigate(['../..'])
      }
      this.formState = value
    })
    this.signupForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9a-zA-Z0-9~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?\/]+$/)]),
      'rememberMe': new FormControl(false),
      'verificationCode': new FormControl({value: '', disabled: true}, Validators.required)
    })
  }

  async onSubmit() {
    const { username, email, password, rememberMe, verificationCode } = this.signupForm.value
    if (verificationCode) {
      const res =  await this.authService.confirmSignUp(username, verificationCode, password)
      if (res.error === "Invalid verification code provided, please try again.") {
        this.signupForm.controls['verificationCode'].setErrors({ wrongVerificationCode: true })
      }
    }
    else if (this.signupForm.valid) {
      const res = await this.authService.signUp(username, password, email)
      if (!res.error) {
        this.signupForm.get('verificationCode')?.enable()
      } else {
        if (res.error === "User already exists") {
          this.signupForm.controls['username'].setErrors({ isUsernameUnique: true })
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
