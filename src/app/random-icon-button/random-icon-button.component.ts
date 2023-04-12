import { Component } from '@angular/core';

@Component({
  selector: 'app-random-icon-button',
  templateUrl: './random-icon-button.component.html',
  styleUrls: ['./random-icon-button.component.css']
})
export class RandomIconButtonComponent {
  randomIcon: string = '';

  getRandomIcon() {
    const icons = [
      'fas fa-address-book',
      'fas fa-adjust',
      'fas fa-anchor',
      'fas fa-star'
    ];
    const randomIndex = Math.floor(Math.random() * icons.length);
    this.randomIcon = icons[randomIndex];
    setTimeout(() => {
      this.randomIcon = '';
    }, 10000);
  }
}
