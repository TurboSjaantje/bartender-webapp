import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Credentials } from './login.model';

@Injectable({
    providedIn: 'root',
})

export class AuthService {

    public currentUser$ = new BehaviorSubject<string | undefined>(undefined);
    public initialized$ = new BehaviorSubject<boolean>(false); // Track initialization
    private readonly CURRENT_USER = 'currentuser';
    private readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });
    private readonly API_URL = environment.apiUrl;

    constructor(private http: HttpClient, private router: Router) {
        this.autoLogin();
    }

    private saveUserToLocalStorage(token: string) {
        localStorage.setItem(this.CURRENT_USER, JSON.stringify(token));
    }

    getAuthorizationToken(): string | undefined {
        const user = localStorage.getItem(this.CURRENT_USER);
        if (user) {
            const localUser = JSON.parse(user);
            return localUser.token;
        }
        return undefined;
    }

    autoLogin() {
        if (this.isLocalStorageAvailable()) {
            const token = localStorage.getItem(this.CURRENT_USER);
            if (token) {
                const localUser = JSON.parse(token);
                this.currentUser$.next(localUser); // Update current user
            }
        }
        this.initialized$.next(true); // Signal that initialization is complete
    }

    login(formData: Credentials): Observable<any> {
        return this.http.post<string>(this.API_URL + 'users/login', formData, { headers: this.HEADERS })
            .pipe(
                map((data: any) => data),
                map((token: string) => {
                    this.saveUserToLocalStorage(token);
                    this.currentUser$.next(token);
                    this.router.navigate(['/home']);
                    return token;
                }),
                catchError((error: HttpErrorResponse) => {
                    console.log(error);
                    return of(new Error('Invalid credentials'));
                })
            );
    }

    logout() {
        this.router.navigate(['/login']).then((success) => {
            if (success) {
                localStorage.removeItem(this.CURRENT_USER);
                this.currentUser$.next(undefined);
            }
        });
    }

    private isLocalStorageAvailable(): boolean {
        try {
            const testKey = '__test__';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    }
}