import { Injectable } from '@angular/core';
import { CanActivate, Route, UrlSegment, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot, Router, RoutesRecognized } from '@angular/router';
import { Observable, skipWhile } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      return isLoggedIn === false? this.router.navigateByUrl('/') : true
    })
    
    return true
  }
}
