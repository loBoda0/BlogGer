import { Injectable } from '@angular/core';
import { Auth } from "aws-amplify"
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  formState = new BehaviorSubject("signUp")
  isLoggedIn = new BehaviorSubject(false)
  
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
      await Auth.signIn(username, password)
      this.formState.next('registered')
      this.isLoggedIn.next(true)
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
      this.isLoggedIn.next(false)
      localStorage.clear()
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

  async getCurrentUserToken(): Promise<string> {
    try {
      const user = await Auth.currentSession()
      const token = user.getIdToken().getJwtToken()
      return token
    } catch (error) {
      console.log(error)
    }
    return ''
  }

  async chechUserExistsOnLoad(): Promise<void> {
    try {
      await Auth.currentAuthenticatedUser()
      this.isLoggedIn.next(true)
    } catch (err) {
      console.log(err)
      this.isLoggedIn.next(false)
    }
  }

}
