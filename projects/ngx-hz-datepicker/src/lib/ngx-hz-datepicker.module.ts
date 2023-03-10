import { NgModule } from '@angular/core';
import { HZDatePickerComponent } from './ngx-hz-datepicker.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    HZDatePickerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HZDatePickerComponent
  ]
})
export class NgxHzDatepickerModule { }