import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
  blog: (Blog | undefined)
  token: string

  constructor(private blogsService: BlogsService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.blog = this.blogsService.getBlogById(params['id'])
    })
    this.getCurrentUserToken()
    this.getBlogAuthorData()
  }

  getDate() {
    return this.blog?.blogId.split('-')[0]
  }

  async getCurrentUserToken() {
    this.token = await this.authService.getCurrentUserToken()
  }

  getBlogAuthorData() {
    try {
    const data = jwt_decode(this.blog.userId)
      return Object.values(data)[3]
    } catch (error) {
      return ''
    }
  }
}
