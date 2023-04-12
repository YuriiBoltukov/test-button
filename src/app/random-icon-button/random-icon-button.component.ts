import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core'
import {BehaviorSubject, delay, fromEvent, Subject, takeUntil, tap} from 'rxjs';
import {style, animate, trigger, transition, state} from '@angular/animations';

/**
 * Entire icon set
 */
library.add(fas)

@Component({
  selector: 'app-random-icon-button',
  styleUrls: ['./random-icon-button.component.css'],
  templateUrl: './random-icon-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '6rem',
        opacity: 1,
        backgroundColor: 'cornsilk'
      })),
      state('closed', style({
        height: '0px',
        opacity: 0.8,
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})

export class RandomIconButtonComponent implements AfterViewInit, OnDestroy {
  /**
   * Instance of button on template
   * @private
   */
  @ViewChild('button', {read: ElementRef})
  private button!: ElementRef;

  /**
   * Random name of icon for using on template
   */
  public randomIcon$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  /**
   * For managing subscriptions
   * @private
   */
  private subject$: Subject<null> = new Subject()

  /**
   * For managing loading state
   */
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public ngAfterViewInit(): void {
    fromEvent(this.button.nativeElement, 'click')
      .pipe(tap(() => this.loading$.next(true)), delay(3000), takeUntil(this.subject$))
      .subscribe(() => {
        this.randomIcon$.next(this.getRandomIcon())
        this.loading$.next(false);
      })
  }

  public ngOnDestroy(): void {
    this.subject$.next(null)
    this.subject$.complete()
  }

  /**
   * Getter for all names of icons of library fortawesome
   * @private
   */
  private get icons(): string[] {
    // @ts-ignore
    return Object.keys(library.definitions.fas).filter(this.isString);
  };

  /**
   * For checking name - if it is number instead of string
   * @param {string} name
   * @private
   */
  private isString(name: string): boolean {
    return Number.isNaN(+name);
  }

  /**
   * For defining random icon name
   * @private
   */
  private getRandomIcon(): string {
    const randomIndex = Math.floor(Math.random() * this.icons.length);

    return `fas fa-${this.icons[randomIndex]}`;
  }
}

