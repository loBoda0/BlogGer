import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'rememberMe': new FormControl(false)
    })
  }


  onSubmit() {
    const { username, password, rememberMe } = this.loginForm.value
    console.log(username, password, rememberMe)
    if (this.loginForm.valid) {
      console.log('Form valid')
    }
  }
}
