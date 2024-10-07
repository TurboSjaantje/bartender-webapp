import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Added Validators
import { CommonModule } from '@angular/common';
import { ApiService } from '../drinks/drinks.service';


class configbottle {
  id: number | undefined;
  name: string | undefined;
}

@Component({
  selector: 'app-mixer',
  standalone: true,
  imports: [NavComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './mixer.component.html',
  styleUrls: ['./mixer.component.css']
})

export class MixerComponent {
  mixerForm: FormGroup;
  drinks = ['Drink 1', 'Drink 2', 'Drink 3', 'Drink 4', 'Drink 5', 'Drink 6'];
  drinkAmounts = [0, 0, 0, 0, 0, 0]; // Array to hold slider values
  maxTotal = 100; // Maximum allowed total (percentage)
  config_drinks: configbottle[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    // Use Validators.required for the name field to ensure it's filled
    this.mixerForm = this.fb.group({
      name: ['', Validators.required], // Name is required
      drink0: [''],
      drink1: [''],
      drink2: [''],
      drink3: [''],
      drink4: [''],
      drink5: ['']
    });

    // Set the initial value of the dropdowns
    this.apiService.get<any>('configuration').subscribe((data: any) => {
      console.log(data); // Log to see the API response

      let bottles = ['drink1', 'drink2', 'drink3', 'drink4', 'drink5', 'drink6'];

      bottles.forEach((bottleKey, i) => {
        let bottle = new configbottle();
        bottle.id = data[bottleKey].id;
        bottle.name = data[bottleKey].name;
        this.config_drinks.push(bottle);
      });
    });
  }

  // Method to check if at least one drink is selected and slid to a non-zero value
  isFormValid(): boolean {
    // Check if the name is valid
    if (this.mixerForm.get('name')?.invalid) {
      return false;
    }

    // Check if at least one drink has been selected and its slider moved to a non-zero value
    const isAnyDrinkSelected = this.drinkAmounts.some(amount => amount > 0);
    return isAnyDrinkSelected;
  }

  // Method to handle slider change
  onSliderChange(event: any, index: number) {
    const newValue = +event.target.value;
    const totalWithoutCurrent = this.drinkAmounts.reduce((acc, val, i) => acc + (i !== index ? val : 0), 0);

    if (totalWithoutCurrent + newValue <= this.maxTotal) {
      this.drinkAmounts[index] = newValue;
    } else {
      this.drinkAmounts[index] = this.maxTotal - totalWithoutCurrent;
    }

    const slider = event.target;
    const percentage = (newValue / 100) * 100;
    slider.style.background = `linear-gradient(to right, #005b37 ${percentage}%, #d1d5db ${percentage}%)`;
  }

  saveMixer() {
    const mixerData = this.drinks.map((drink, i) => {
      const selectedDrinkId = this.mixerForm.get(`drink${i}`)?.value;
      const selectedDrinkAmount = this.drinkAmounts[i];
      
      if (selectedDrinkAmount > 0 && selectedDrinkId) {
        const selectedDrink = this.config_drinks.find(d => d.id == +selectedDrinkId);

        if (selectedDrink) {
          return {
            id: selectedDrink.id,
            name: selectedDrink.name,
            amount: selectedDrinkAmount
          };
        }
      }
      return null;
    }).filter(drink => drink !== null);

    console.log('Mixer Data (Drinks with non-zero amounts):', mixerData);
  }
}
