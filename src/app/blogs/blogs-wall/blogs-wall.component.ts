import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Blog } from '../blog';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-blogs-wall',
  templateUrl: './blogs-wall.component.html',
  styleUrls: ['./blogs-wall.component.css']
})
export class BlogsWallComponent implements OnInit {
  blogs: Blog[] = []

  constructor(private blogsService: BlogsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.blogsService.isDataFetched.subscribe(isLoaded => {
      if (isLoaded) {
        this.blogs = this.blogsService.getBlogs()
      }
    })
  }
}
