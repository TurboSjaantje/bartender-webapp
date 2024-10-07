import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { ApiService } from '../drinks/drinks.service';

class configbottle {
  id: number | undefined;
  name: string | undefined;
  volume: number | undefined;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NavComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  settingsForm: FormGroup;
  config_drinks: configbottle[] = []; // Array to hold drinks

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.settingsForm = this.fb.group({
      bottles: this.fb.array([]) // Create the form array to hold multiple bottles
    });

    // Fetch available drinks from the API
    this.apiService.get<any>('configuration').subscribe((data: any) => {
      let bottles = ['drink1', 'drink2', 'drink3', 'drink4', 'drink5', 'drink6'];

      bottles.forEach((bottleKey) => {
        let bottle = new configbottle();
        bottle.id = data[bottleKey].id;
        bottle.name = data[bottleKey].name;
        bottle.volume = 1500; // Default to 1500mL

        this.addBottleForm(bottle); // Add the bottle to the form
        this.config_drinks.push(bottle); // Push the bottle data to config_drinks array
      });
    });
  }

  // Getter for the bottles form array
  get bottlesArray() {
    return this.settingsForm.get('bottles') as FormArray;
  }

  // Method to add a bottle form to the form array
  addBottleForm(bottle: configbottle) {
    const bottleForm = this.fb.group({
      id: [bottle.id, Validators.required], // Bottle ID (dropdown)
      name: [bottle.name], // Bottle name (for display purposes)
      volume: [bottle.volume, Validators.required] // Bottle volume
    });
    this.bottlesArray.push(bottleForm); // Add the new bottle form to the form array
  }

  // Method to set all bottles to 1500mL
  setAllBottlesToFull() {
    this.bottlesArray.controls.forEach(control => {
      control.get('volume')?.setValue(1500); // Set volume to 1500mL for all bottles
    });
  }

  // Method to save the settings for all bottles
  saveSettings() {
    const bottles = this.bottlesArray.value; // Get all bottle form values
    console.log('Saved Bottles:', bottles); // Log the saved bottles
  }
}
