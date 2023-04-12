import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RandomIconButtonComponent } from './random-icon-button/random-icon-button.component';

@NgModule({
  declarations: [
    AppComponent,
    RandomIconButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
