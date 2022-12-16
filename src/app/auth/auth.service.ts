import { Injectable } from '@angular/core';
import { Auth } from "aws-amplify"
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  formState = new BehaviorSubject("signUp")
  user = new BehaviorSubject(null)
  
  constructor() { }

  async signUp(username: string, password: string, email: string) {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      })
      this.formState.next('confirmSignUp')
    } catch (err) {
      this.formState.next('signUp')
      console.log(err)
    }
  }

  async confirmSignUp(username: string, verificationCode: string, password: string) {
    try {
      await Auth.confirmSignUp(username, verificationCode)
      this.logIn(username, password)
    } catch (err) {
      console.log(err)
    }
  }

  async logIn(username: string, password: string) {
    try {
      const user = await Auth.signIn(username, password)
      console.log(user)
      localStorage.setItem('user', JSON.stringify(user))
      this.user.next(user)
      this.formState.next('registered')
      return {
        success: 'success'
      }
    } catch (err: any) {
      return {
        error: err.message
      }
    }
  }

  async signOut() {
    try {
      await Auth.signOut();
      this.formState.next('signUp')
      localStorage.clear()
      this.user.next(null)
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }
}
