import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-drinks',
  standalone: true,
  imports: [NavComponent, CardComponent],
  templateUrl: './drinks.component.html',
  styleUrl: './drinks.component.css'
})
export class DrinksComponent {

}
