import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Blog } from '../blog';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-blogs-new',
  templateUrl: './blogs-new.component.html',
  styleUrls: ['./blogs-new.component.css']
})
export class BlogsNewComponent implements OnInit {
  newBlog: FormGroup

  constructor(private blogsService: BlogsService) { }

  ngOnInit(): void {
    this.newBlog = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'body': new FormControl(null, Validators.required),
      'image': new FormControl(null)
    })
  }

  publishBlog() {
    if (this.newBlog.valid) {
      const { title, body, image } = this.newBlog.value
      this.blogsService.createBlog(new Blog(title, body, image))
    } else {
      console.log('Form invalid')
    }
  }
}
