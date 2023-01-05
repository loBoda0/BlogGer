import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-blogs-hero',
  templateUrl: './blogs-hero.component.html',
  styleUrls: ['./blogs-hero.component.css']
})
export class BlogsHeroComponent implements OnInit {
  isLoggedIn: boolean

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn
    })
  }

  goToNew() {
    this.router.navigateByUrl('/new')
  }
}
