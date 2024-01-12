import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Blog } from '../blog';
import { BlogsService } from '../blogs.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-blogs-edit',
  templateUrl: './blogs-edit.component.html',
  styleUrls: ['./blogs-edit.component.css']
})
export class BlogsEditComponent implements OnInit {
  editBlogForm: FormGroup
  blog: Blog
  id: string

  constructor(
    private blogService: BlogsService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      this.blog = this.blogService.getBlogById(this.id)
    })
    this.editBlogForm = new FormGroup({
      title: new FormControl(this.blog.title, Validators.required),
      body: new FormControl(this.blog.body, Validators.required),
      image: new FormControl(this.blog.image),
    })
  }

  updateBlog() {
    if (this.editBlogForm.valid) {
      const { title, body, image } = this.editBlogForm.value
      this.blog.title = title
      this.blog.body = body
      this.blog.image = image
      this.blogService.updateBlogPost(this.id, this.blog)
      this.router.navigate(['/'])
    }
  }

}
