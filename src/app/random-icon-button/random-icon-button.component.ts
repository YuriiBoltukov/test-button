import { Component } from '@angular/core';
import { IconService } from '../icon.service';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-random-icon-button',
  templateUrl: './random-icon-button.component.html',
  styleUrls: ['./random-icon-button.component.css']
})
export class RandomIconButtonComponent {
  randomIcon: string = '';
  constructor(private iconService: IconService) { }
  getRandomIcon() {
    this.iconService.getIcons()
      .pipe(
        delay(3000),
        tap(icons => {
          const randomIndex = Math.floor(Math.random() * icons.length);
          this.randomIcon = `fas fa-${icons[randomIndex].id}`;
        })
      )
      .subscribe();
  }
}
