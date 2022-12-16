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
  user: any
  sub: Subscription

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.authService.user.subscribe(user => {
      this.user = user
    })
  }

  goToNew() {
    this.router.navigateByUrl('/new')
  }
}
