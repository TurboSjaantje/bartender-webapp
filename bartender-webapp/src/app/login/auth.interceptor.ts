import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './authentication.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getAuthorizationToken();

    const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
    });

    return next(authReq);
};
