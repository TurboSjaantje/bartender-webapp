import { Component, HostListener } from '@angular/core';
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
  sidebarOpen: boolean = false;

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

  // Toggles the sidebar's open/close state
  toggleSidebar(event: Event): void {
    event.stopPropagation(); // Prevent the sidebar from closing immediately
    this.sidebarOpen = !this.sidebarOpen;
  }

  // Detects clicks outside the sidebar to close it
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event): void {
    const sidebar = document.getElementById('logo-sidebar');
    const toggleButton = document.getElementById('toggleSidebar');

    if (this.sidebarOpen && sidebar && toggleButton) {
      const targetElement = event.target as HTMLElement;

      // Check if the click was outside both the sidebar and the toggle button
      if (!sidebar.contains(targetElement) && !toggleButton.contains(targetElement)) {
        this.sidebarOpen = false;
      }
    }
  }

}
