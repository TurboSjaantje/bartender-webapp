import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

    private readonly CURRENT_USER = 'currentuser';

    constructor(private router: Router) {}

    canActivate(): boolean {
        // Check if window and localStorage are available (i.e., running in the browser)
        if (this.isBrowserEnvironment()) {
            const token = this.getAuthorizationTokenFromLocalStorage();

            if (token) {
                // If token is found, allow route activation
                return true;
            } else {
                // If no token is found, redirect to login
                this.router.navigate(['/login']);
                return false;
            }
        } else {
            // If not in the browser, deny access
            return false;
        }
    }

    // Utility function to check if running in the browser
    private isBrowserEnvironment(): boolean {
        return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    }

    // Utility function to get token from localStorage
    private getAuthorizationTokenFromLocalStorage(): string | null {
        const storedUser = localStorage.getItem(this.CURRENT_USER);
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            return parsedUser.token || null;
        }
        return null;
    }
}
