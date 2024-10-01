import { Component } from '@angular/core';
import { AuthService } from './authentication.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credentials } from './login.model';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  errormessage: string | undefined;
  loginreturn: string | Error | undefined;
  loginForm: any;

  constructor(private authService: AuthService, private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      emailaddress: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Auto-login if a token is found in localStorage
    this.authService.getUserFromLocalStorage().subscribe({
      next: (user) => {
        if (user) {
          // If a token is found, navigate to the home page (or any protected route)
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.errormessage = err.message;
      }
    });
  }

  public login(): void {
    if (this.loginForm.valid) {
      const credentials = new Credentials(
        this.loginForm.get('emailaddress')?.value!,  // Access form values correctly
        this.loginForm.get('password')?.value!
      );

      this.authService.login(credentials).subscribe({
        next: (res) => {
          this.loginreturn = res;
        },
        error: (err) => {
          this.errormessage = err.message;  // Error handling
        }
      });
    } else {
      console.log('Invalid credentials');
    }
  }

}
