import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: any
  sub: Subscription

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.sub = this.authService.user.subscribe(user => {
      this.user = user
    })
  }

  logOut() {
    this.authService.signOut()
  }
}
