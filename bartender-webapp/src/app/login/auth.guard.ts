import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { AuthService } from "./authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _authService: AuthService, private _router: Router) { }

    canActivate(): Observable<boolean> {
        return this._authService.currentUser$.pipe(
            map((token: string | undefined) => {
                if (token) {
                    console.log('Token found, user is logged in');
                    return true;
                } else {
                    console.log('Token not found, user is not logged in');
                    this._router.navigate(['/login']);
                    return false;
                }
            })
        );
    }
}