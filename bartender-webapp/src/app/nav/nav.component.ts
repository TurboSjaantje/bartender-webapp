import { Component } from '@angular/core';
import { AuthService } from '../login/authentication.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent {

  public isLoggedIn: boolean = false;

  constructor(private authService: AuthService) { }

  nGOnChanges() {
    if (this.authService.getAuthorizationToken() == undefined) {
      this.isLoggedIn = false;
    }
  }

  logout() {
    console.log('Logging out');
    this.authService.logout();
  }

}
