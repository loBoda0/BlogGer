import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BlogsService } from './blogs/blogs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BlogGer';

  constructor(private authService: AuthService, private blogsService: BlogsService) {
    authService.chechUserExistsOnLoad()
    blogsService.fetchBlogsFromDB()
  }
}
