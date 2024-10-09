import { Component, HostListener } from '@angular/core';
import { AuthService } from '../login/authentication.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  public isLoggedIn: boolean = false;
  sidebarOpen: boolean = false;
  isMobile: boolean = false;

  constructor(private authService: AuthService) {
    this.checkScreenSize();
  }

  nGOnChanges() {
    if (this.authService.getAuthorizationToken() == undefined) {
      this.isLoggedIn = false;
    }
  }

  logout() {
    console.log('Logging out');
    this.authService.logout();
  }

  // Toggles the sidebar's open/close state (only works on mobile)
  toggleSidebar(event: Event): void {
    if (this.isMobile) {
      event.stopPropagation(); // Prevent the sidebar from closing immediately
      this.sidebarOpen = !this.sidebarOpen;
    }
  }

  // Detects clicks outside the sidebar to close it
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event): void {
    const sidebar = document.getElementById('logo-sidebar');
    const toggleButton = document.getElementById('toggleSidebar');

    if (this.sidebarOpen && this.isMobile && sidebar && toggleButton) {
      const targetElement = event.target as HTMLElement;

      // Check if the click was outside both the sidebar and the toggle button
      if (!sidebar.contains(targetElement) && !toggleButton.contains(targetElement)) {
        this.sidebarOpen = false;
      }
    }
  }

  // Detects window resizing to determine if the screen is mobile size or not
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  // Checks the current screen size to set the `isMobile` flag
  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 640;  // Tailwind's 'sm' breakpoint is 640px
    if (!this.isMobile) {
      this.sidebarOpen = true; // Ensure the sidebar is always open on desktop
    }
  }
}
