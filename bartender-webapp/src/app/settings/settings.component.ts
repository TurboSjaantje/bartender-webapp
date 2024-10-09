import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { ApiService } from '../drinks/drinks.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NavComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  settingsForm: FormGroup;
  config_drinks: any[] = []; // Array to hold available drinks

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    // Initialize the form with all bottle controls in a single group
    this.settingsForm = this.fb.group({
      bottle1Id: [null, Validators.required],
      bottle2Id: [null, Validators.required],
      bottle3Id: [null, Validators.required],
      bottle4Id: [null, Validators.required],
      bottle5Id: [null, Validators.required],
      bottle6Id: [null, Validators.required]
    });

    // Fetch available drinks for dropdown options
    this.apiService.get<any>('drinks').subscribe((data: any) => {
      this.config_drinks = data;
      console.log('Config Drinks:', this.config_drinks);
    });

    // Fetch current configuration and populate the form
    this.apiService.get<any>('configuration').subscribe((data: any) => {
      console.log('Configuration:', data);

      // Populate the form with the current configuration
      this.settingsForm.patchValue({
        bottle1Id: data.drink1?.id || null,
        bottle2Id: data.drink2?.id || null,
        bottle3Id: data.drink3?.id || null,
        bottle4Id: data.drink4?.id || null,
        bottle5Id: data.drink5?.id || null,
        bottle6Id: data.drink6?.id || null
      });
    });
  }

  // Method to save the settings for all bottles
  saveSettings() {
    const bottles = this.settingsForm.value; // Get all form values

    // Prepare payload for API and convert values to integers
    const payload = {
      bottle1Id: parseInt(bottles.bottle1Id, 10) || 0,
      bottle2Id: parseInt(bottles.bottle2Id, 10) || 0,
      bottle3Id: parseInt(bottles.bottle3Id, 10) || 0,
      bottle4Id: parseInt(bottles.bottle4Id, 10) || 0,
      bottle5Id: parseInt(bottles.bottle5Id, 10) || 0,
      bottle6Id: parseInt(bottles.bottle6Id, 10) || 0,
    };

    console.log('Sending this payload:', payload);

    // Make API call to save configuration
    this.apiService.put<any>('Configuration', payload).subscribe(
      response => {
        console.log('Configuration Saved:', response);
      },
      error => {
        console.error('An error occurred:', error);
      }
    );
  }

}
