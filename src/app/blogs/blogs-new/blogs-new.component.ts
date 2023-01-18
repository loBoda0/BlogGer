import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Blog } from '../blog';
import { BlogsService } from '../blogs.service';
import { createBlogDto } from '../interfaces/createBlogDto';

@Component({
  selector: 'app-blogs-new',
  templateUrl: './blogs-new.component.html',
  styleUrls: ['./blogs-new.component.css']
})
export class BlogsNewComponent implements OnInit {
  newBlog: FormGroup

  constructor(private blogsService: BlogsService, private router: Router) { }

  ngOnInit(): void {
    this.newBlog = new FormGroup({
      'title': new FormControl('test', Validators.required),
      'body': new FormControl('test', Validators.required),
      'image': new FormControl('https://images.unsplash.com/photo-1671733035764-4db6f30c0a79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')
    })
  }

  async publishBlog() {
    if (this.newBlog.valid) {
      const { title, body, image } = this.newBlog.value
      const blogDto: createBlogDto = {title, body, image}
      const res = await this.blogsService.createBlog(blogDto)
      if (res.success) {
        this.router.navigate(['..'])
      }
    } else {
      console.log('Form invalid')
    }
  }
}
