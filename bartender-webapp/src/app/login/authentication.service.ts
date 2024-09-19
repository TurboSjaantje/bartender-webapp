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

    public currentUSer$ = new BehaviorSubject<string | undefined>(undefined);
    private readonly CURRENT_USER = 'currentuser';
    private readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });
    private readonly API_URL = environment.apiUrl;

    constructor(private http: HttpClient, private router: Router) { }

    private saveUserToLocalStorage(token: string) {
        localStorage.setItem(this.CURRENT_USER, token);
    }

    getUserFromLocalStorage(): Observable<string | undefined> {
        const user = localStorage.getItem(this.CURRENT_USER);
        if (user) {
            const localUser = JSON.parse(user);
            return of(localUser);
        } else {
            return of(undefined);
        }
    }

    getAuthorizationToken(): string | undefined {
        const user = localStorage.getItem(this.CURRENT_USER);
        if (user) {
            const localUser = JSON.parse(user);
            return localUser.token;
        }
        return undefined;
    }

    login(formData: Credentials): Observable<any> {
        return this.http.post<string>(this.API_URL + 'users/login', formData, { headers: this.HEADERS })
            .pipe(
                map((data: any) => data),
                map((token: string) => {
                    this.saveUserToLocalStorage(token);
                    this.currentUSer$.next(token);
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
        console.log('Logging out');
        this.router.navigate(['/login'])
            .then((success) => {
                if (success) {
                    localStorage.removeItem(this.CURRENT_USER);
                    this.currentUSer$.next(undefined);
                } else {
                    console.log('Error logging out');
                }
            }).catch((error) => { console.log('Error logging out'); });
    }

}
