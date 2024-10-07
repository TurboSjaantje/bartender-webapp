import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { CardComponent } from '../card/card.component';
import { ApiService } from '../drinks/drinks.service';
import { Route, Router, RouterFeature } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIconComponent, NavComponent, CardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

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
