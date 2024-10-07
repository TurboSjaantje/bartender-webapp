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
  styleUrl: './drink-detail.component.css'
})
export class DrinkDetailComponent {

  drink: any = {};

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private drinkService: DrinkService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getDrinkById(+id);
      }
    });
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

  makeDrink() {
    const drinkName = this.drink.name;  // Ensure you are extracting only the name field
  
    this.drinkService.makeDrink(drinkName).subscribe(
      (response) => {
        console.log('POST response:', response);
      },
      (error) => {
        console.log('POST error:', error);
      }
    );
  }  

}
