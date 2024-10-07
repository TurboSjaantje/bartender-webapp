import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CardComponent } from '../card/card.component';
import { ApiService } from './drinks.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drinks',
  standalone: true,
  imports: [NavComponent, CommonModule],
  templateUrl: './drinks.component.html',
  styleUrl: './drinks.component.css'
})
export class DrinksComponent {

  drinks: any = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.apiService.get<any>('mocktail').subscribe(
      (response) => {
        console.log('GET response:', response);
        this.drinks = response;
      },
      (error) => {
        console.log('GET error:', error);
      }
    );
  }

  goToDetailPage(drinkId: number) {
    this.router.navigate(['/drink', drinkId]);
  }

}
