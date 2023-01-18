import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  sub: Subscription

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.authService.formState.subscribe((value) => {
      if (value === 'registered') {
        this.router.navigate(['../..'])
      }
    })
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'rememberMe': new FormControl(false)
    })
  }


  async onSubmit() {
    const { username, password, rememberMe } = this.loginForm.value
    if (this.loginForm.valid) {
      const res = await this.authService.logIn(username, password)
      if (res.error === 'User does not exist.') {
        this.loginForm.controls['username'].setErrors({ userDoesNotExist: true })
      }
      if (res.error === 'Incorrect username or password.') {
        this.loginForm.controls['password'].setErrors({ wrongPassword: true })
      }
    }
  }
}
