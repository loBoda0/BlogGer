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
      if (value === 'confirmSignUp') {
        this.signupForm.get('verificationCode')?.enable()
      }
      this.formState = value
    })
    this.signupForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', (Validators.required, Validators.email)),
      'password': new FormControl('', Validators.required),
      'rememberMe': new FormControl(false),
      'verificationCode': new FormControl({value: '', disabled: true}, Validators.required)
    })
  }

  onSubmit() {
    const { username, email, password, rememberMe, verificationCode } = this.signupForm.value
    if (this.signupForm.valid) {
      this.authService.signUp(username, password, email)
    }
    if (verificationCode !== '') {
      this.authService.confirmSignUp(username, verificationCode, password)
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
