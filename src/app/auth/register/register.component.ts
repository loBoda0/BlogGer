import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, (Validators.required, Validators.email)),
      'password': new FormControl(null, Validators.required),
      'rememberMe': new FormControl(false)
    })
  }

  onSubmit() {
    const { username, email, password, rememberMe } = this.signupForm.value
    console.log(username, email, password, rememberMe)
    if (this.signupForm.valid) {
      console.log('Form valid')
    }
  }
}
