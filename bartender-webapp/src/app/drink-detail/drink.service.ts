import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DrinkService {
    private apiUrl = 'http://192.168.8.130:5000/api/makedrink';  // Correct Flask API URL

    constructor(private http: HttpClient) { }
  
    makeDrink(drinkName: string): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
  
      const body = { order: drinkName };
  
      // Ensure that you're using the correct API URL
      return this.http.post<any>(this.apiUrl, body, { headers });
    }
}