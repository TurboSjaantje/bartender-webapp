import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../drinks/drinks.service';
import { CommonModule } from '@angular/common';
import { DrinkService } from './drink.service';

@Component({
  selector: 'app-drink-detail',
  standalone: true,
  imports: [NavComponent, CommonModule],
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.css']
})
export class DrinkDetailComponent {
  drink: any = {};
  id: any;
  possibleDrinks: any[] = [];
  makingDrink: boolean = true; // Initially set to true to disable the "Make Drink" button if in progress
  isMakingDrink: boolean = false; // Flag to track if a drink is currently being made

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private drinkService: DrinkService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.id = id;
      if (id) {
        this.getDrinkById(+id);
        this.getConfiguration();
      }
    });
    this.getPossibleDrinks();
  }

  getDrinkById(id: number) {
    this.apiService.get<any>('mocktail/' + id).subscribe(
      (response) => {
        console.log('GET response:', response);
        this.drink = response;
      },
      (error) => {
        console.log('GET error:', error);
      }
    );
  }

  getPossibleDrinks() {
    this.apiService.get<any>('drinklist').subscribe(
      (response) => {
        console.log('GET possible drinks response:', response);
        this.possibleDrinks = response.drinks;
      },
      (error) => {
        console.log('GET possible drinks error:', error);
      }
    );
  }

  getConfiguration() {
    this.apiService.get<any>('configuration').subscribe(
      (response) => {
        console.log('GET configuration response:', response);
        this.makingDrink = response.makingDrink; // Set makingDrink state
      },
      (error) => {
        console.log('GET configuration error:', error);
      }
    );
  }

  makeDrink() {
    // Immediately disable the button by setting isMakingDrink to true
    this.isMakingDrink = true;

    const drinkName = this.drink.name;

    this.drinkService.makeDrink(drinkName).subscribe(
      (response) => {
        console.log('POST response:', response);
        // Optionally reset isMakingDrink to false if you want to allow making the drink again in some cases
        // this.isMakingDrink = false; 
      },
      (error) => {
        console.log('POST error:', error);
        // If there is an error, re-enable the button
        this.isMakingDrink = false;
      }
    );
  }

  deleteDrink() {
    const confirmDelete = confirm('Are you sure you want to delete this drink? This action cannot be undone.');

    if (confirmDelete) {
      const drinkName = this.drink.name;

      this.apiService.delete<any>('mocktail/' + this.id).subscribe(
        (response) => {
          console.log('DELETE response:', response);
          this.router.navigate(['/drinks']);
        },
        (error) => {
          console.log('DELETE error:', error);
        }
      );
    } else {
      console.log('Deletion canceled by user.');
    }
  }

  canMakeDrink(): boolean {
    return (
      !this.makingDrink &&
      !this.isMakingDrink &&
      this.possibleDrinks.some(possible => possible.name === this.drink.name)
    );
  }
}
