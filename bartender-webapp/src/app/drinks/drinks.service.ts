import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = environment.apiUrl;
  private readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  /**
   * Generic GET method
   * @param endpoint API endpoint to call
   * @param headers Optional custom headers
   */
  get<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    return this.http
      .get<T>(this.API_URL + endpoint, { headers: headers || this.HEADERS })
      .pipe(catchError(this.handleError));
  }

  /**
   * Generic POST method
   * @param endpoint API endpoint to call
   * @param body Payload to send in the POST request
   * @param headers Optional custom headers
   */
  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http
      .post<T>(this.API_URL + endpoint, body, { headers: headers || this.HEADERS })
      .pipe(catchError(this.handleError));
  }

  /**
   * Generic PUT method
   * @param endpoint API endpoint to call
   * @param body Payload to send in the PUT request
   * @param headers Optional custom headers
   */
  put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http
      .put<T>(this.API_URL + endpoint, body, { headers: headers || this.HEADERS })
      .pipe(catchError(this.handleError));
  }

  /**
   * Generic DELETE method
   * @param endpoint API endpoint to call
   * @param headers Optional custom headers
   */
  delete<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    return this.http
      .delete<T>(this.API_URL + endpoint, { headers: headers || this.HEADERS })
      .pipe(catchError(this.handleError));
  }

  /**
   * Error handling function for HTTP requests
   */
  private handleError(error: HttpErrorResponse) {
    console.error('API error occurred:', error);
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('Client-side error:', error.error.message);
    } else {
      // Server-side error
      console.error(`Server-side error: ${error.status} - ${error.message}`);
    }
    // Throw an observable with a user-facing error message
    return throwError('Something went wrong. Please try again later.');
  }
}
