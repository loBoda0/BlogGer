import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BlogGer';

  constructor(private authService: AuthService) {
    if (localStorage.getItem('user')) {
      authService.user.next(JSON.parse(localStorage.getItem('user')))
    }
  }
}
