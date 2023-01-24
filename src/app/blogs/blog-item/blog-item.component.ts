import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, TitleStrategy } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/auth/auth.service';
import { Blog } from '../blog';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css']
})
export class BlogItemComponent implements OnInit {
  postComment: FormGroup
  blog: (Blog | undefined)
  isEditable: boolean = false

  constructor(private blogsService: BlogsService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.postComment = new FormGroup({
      'body' : new FormControl('', Validators.required)
    })
    this.blogsService.isDataFetched.subscribe(isLoaded => {
      if (isLoaded) {
        this.route.params.subscribe((params: Params) => {
          this.blog = this.blogsService.getBlogById(params['id'])
        })
        this.getCurrentUserToken()
      }
    })
  }

  getDate() {
    return this.blog?.blogId.split('-')[0]
  }

  async getCurrentUserToken() {
    if (this.blog.userId === await this.authService.getCurrentUser()) {
      this.isEditable = true
    }
  }

  addComment() {
    console.log('object')
    const {body} = this.postComment.value
    if (this.postComment.valid) {
      this.blogsService.postComment(this.blog.blogId, body)
      this.postComment.reset()
    }
  }
}
