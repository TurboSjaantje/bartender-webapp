import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-mixer',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './mixer.component.html',
  styleUrl: './mixer.component.css'
})
export class MixerComponent {

}
