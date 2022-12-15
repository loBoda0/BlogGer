import { Component, OnInit } from '@angular/core';
import { Blog } from '../blog';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-blogs-wall',
  templateUrl: './blogs-wall.component.html',
  styleUrls: ['./blogs-wall.component.css']
})
export class BlogsWallComponent implements OnInit {
  blogs: Blog[] = []

  constructor(private blogsService: BlogsService) { }

  ngOnInit(): void {
    this.blogs = this.blogsService.getBlogs()
  }

}
