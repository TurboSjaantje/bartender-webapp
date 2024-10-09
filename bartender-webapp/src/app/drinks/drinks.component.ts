import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { ApiService } from './drinks.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drinks',
  standalone: true,
  imports: [NavComponent, CommonModule],
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit {

  allDrinks: any[] = [];
  possibleDrinks: any[] = [];
  drinks: any[] = [];
  showAll: boolean = false; // Initially false, so only possible drinks are loaded

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    // Fetch all drinks and possible drinks when the component loads
    this.getAllDrinks();
    this.getDrinklist();
  }

  // Navigate to the detail page
  goToDetailPage(drinkId: number) {
    this.router.navigate(['/drink', drinkId]);
  }

  // Fetch all available drinks (e.g., mocktails)
  getAllDrinks(): void {
    this.apiService.get<any>('mocktail').subscribe(
      (response) => {
        console.log('GET all drinks response:', response);
        this.allDrinks = response;
        // Only set possible drinks if we're not showing all drinks
        if (!this.showAll) {
          this.setAllDrinksToPossible();
        }
      },
      (error) => {
        console.log('GET all drinks error:', error);
      }
    );
  }

  // Fetch the possible drink list
  getDrinklist(): void {
    this.apiService.get<any>('drinklist').subscribe(
      (response) => {
        console.log('GET drink list response:', response);
        this.possibleDrinks = response.drinks;
        if (!this.showAll) {
          this.setAllDrinksToPossible();
        }
      },
      (error) => {
        console.log('GET drink list error:', error);
      }
    );
  }

  // Set possible drinks based on the drink list and all drinks
  setAllDrinksToPossible() {
    this.drinks = this.allDrinks.filter(drink =>
      this.possibleDrinks.some(possible => possible.name === drink.name)
    );
  }

  // Set drinks to all available drinks
  setAllDrinksToAll() {
    this.drinks = [...this.allDrinks];
  }

  // Toggle between showing all drinks and possible drinks
  toggleShowAll() {
    this.showAll = !this.showAll;

    if (this.showAll) {
      this.setAllDrinksToAll();
    } else {
      this.setAllDrinksToPossible();
    }
  }
}
