import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HZDatePickerComponent, DPConfig } from './src/hz-date-picker.component';
import { HZDatePickerService } from './src/hz-date-picker.service';

export * from './src/hz-date-picker.component';
export * from './src/hz-date-picker.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HZDatePickerComponent
  ],
  exports: [
    HZDatePickerComponent
  ]
})
export class HZDatePickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HZDatePickerModule,
      providers: [HZDatePickerService]
    };
  }
}
