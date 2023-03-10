import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxHzDatepickerModule } from 'projects/ngx-hz-datepicker/src/public-api';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgxHzDatepickerModule
  ],
  providers: [NgxHzDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
