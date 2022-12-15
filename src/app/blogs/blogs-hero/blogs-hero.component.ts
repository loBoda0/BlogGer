import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs-hero',
  templateUrl: './blogs-hero.component.html',
  styleUrls: ['./blogs-hero.component.css']
})
export class BlogsHeroComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToNew() {
    this.router.navigateByUrl('/new')
  }
}
