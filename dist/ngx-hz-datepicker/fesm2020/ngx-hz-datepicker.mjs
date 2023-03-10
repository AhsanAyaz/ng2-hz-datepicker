import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, ViewChild, Input, Output, NgModule } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

class NgxHzDatepickerComponent {
    constructor() { }
    ngOnInit() {
    }
    /**
     * @author Ahsan Ayaz
     * This function returns an array of custom objects representing days information in the given month
     * @param dateObj{Date}
     * @returns {Array}
     */
    getDaysOfMonth(dateObj = new Date()) {
        let days = [];
        let noOfDays = this.daysInMonth(dateObj);
        for (var i = 1, len = noOfDays; i <= len; i++) {
            let text = i.toString();
            // grab current date and check passed arguments.
            let date, month, year;
            date = i; //setting the date here
            if (!month || month === undefined) {
                month = dateObj.getMonth();
            }
            if (!year || year === undefined) {
                year = dateObj.getFullYear();
            }
            let currDate = new Date(year, month, date);
            days.push({
                text: text,
                date: currDate,
                isWeekend: (currDate.getDay() == 6 || currDate.getDay() == 0),
                isSelected: dateObj.getDate() == i
            });
        }
        return days;
    }
    /**
     * @author Ahsan Ayaz
     * Returns if the dateObject passed is an actual Date
     * @param dateObj {Date}
     * @returns {boolean} istDate value
     */
    isDate(dateObj) {
        var date = dateObj ? new Date(dateObj.toString()) : null;
        return (date !== null) && !isNaN(date) && (date.getDate() !== undefined);
    }
    /**
     * @author Ahsan Ayaz
     * Calculates the no of days in the given date or using given year and month
     * @param dateObj {Date}
     * @param year {number}
     * @param month {number}
     * @returns no of days {number}
     */
    daysInMonth(dateObj, year, month) {
        year = dateObj ? dateObj.getFullYear() : year;
        month = dateObj ? dateObj.getMonth() : month;
        if (year === undefined || month === undefined) {
            throw new Error('Year and month parameters are required');
        }
        let startDate = new Date(year, month, 1), endDate = new Date(year, month + 1, 1);
        let calc = (endDate - startDate) / (1000 * 60 * 60 * 24);
        return parseInt(calc, 10);
    }
    /**
     * @author Ahsan Ayaz
     * Calculates the no of weeks in the given date (month)
     * @param dateObj {Date}
     * @returns number of days {number}
     */
    weeksInMonth(dateObj) {
        let year = dateObj.getFullYear();
        let month = dateObj.getMonth();
        var firstOfMonth = new Date(year, month - 1, 1), lastOfMonth = new Date(year, month, 0), used = firstOfMonth.getDay() + lastOfMonth.getDate();
        return Math.ceil(used / 7);
    }
}
NgxHzDatepickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.2", ngImport: i0, type: NgxHzDatepickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NgxHzDatepickerComponent.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.2", ngImport: i0, type: NgxHzDatepickerComponent });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.2", ngImport: i0, type: NgxHzDatepickerComponent, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class HZDatePickerComponent {
    constructor(dpService) {
        this.dpService = dpService;
        this.onDateChange = new EventEmitter();
        this.viewLoaded = false;
        this.isCallInProgress = false;
        this.daysOfMonth = [];
        this.selectedDate = new Date();
        this.MONTH_NAVS = {
            NEXT: 'next',
            PREV: 'previous'
        };
        this.validDayFormats = ["E", "EEE", "EEEE"];
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.updateDateBtns();
        this.setDefaultConfigValues();
        setTimeout(() => {
            this.viewLoaded = true;
        }, 0);
    }
    /**
     * @author Ahsan Ayaz
     * Sets the inital config properties to be used by the datepicker template
     */
    setDefaultConfigValues() {
        this.dpConfig = this.dpConfig || {};
        this.dpConfig.dayFormat = this.dpConfig.dayFormat ? this.dpConfig.dayFormat : 'E';
        if (this.validDayFormats.indexOf(this.dpConfig.dayFormat) == -1) {
            throw new Error("Invalid day format in dpConfig, supported formats are = " + this.validDayFormats.join());
        }
        this.dpConfig.selectedDateFormat = this.dpConfig.selectedDateFormat ? this.dpConfig.selectedDateFormat : 'fullDate';
        this.dpConfig.selectedItemClass = this.dpConfig.selectedItemClass ? this.dpConfig.selectedItemClass + ' selected' : 'selected';
    }
    /**
     * @author Ahsan Ayaz
     * This function is triggered when a date is clicked from the dates list
     * @param dayBtn
     */
    onDateClick(dayBtn) {
        this.daysOfMonth.forEach((btn) => {
            btn.isSelected = false;
        });
        dayBtn.isSelected = true;
        this.selectedDate = dayBtn.date;
        this.onDateChange.emit(this.selectedDate);
    }
    /**
     * @author Ahsan Ayaz
     * This function updates the buttons to display using the current date
     * @param date
     */
    updateDateBtns(date) {
        this.daysOfMonth = this.dpService.getDaysOfMonth(date);
        this.isCallInProgress = true;
        setTimeout(() => {
            this.isCallInProgress = false;
        }, 1500);
    }
    /**
     * @author Ahsan Ayaz
     * This function is triggered when the user clicks on any of the next month nav button or previous month nav button
     * Fetches the next month's buttons from service and updates the buttons on view.
     * Also sets the same date of the next month as selected date
     * @param target
     */
    onMonthNavClick(target) {
        let targetMonth = (target == this.MONTH_NAVS.NEXT) ? this.selectedDate.getMonth() + 1 : this.selectedDate.getMonth() - 1;
        let dateToSet = this.selectedDate.getDate();
        let targetMonthDaysCount = this.dpService.daysInMonth(new Date(), this.selectedDate.getFullYear(), targetMonth);
        if (dateToSet > targetMonthDaysCount) {
            dateToSet = targetMonthDaysCount;
        }
        let neededDate = new Date(this.selectedDate.getFullYear(), targetMonth, dateToSet);
        this.updateDateBtns(neededDate);
        this.selectedDate = this.daysOfMonth[neededDate.getDate() - 1].date;
        this.onDateChange.emit(this.selectedDate);
    }
}
HZDatePickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.2", ngImport: i0, type: HZDatePickerComponent, deps: [{ token: NgxHzDatepickerComponent }], target: i0.ɵɵFactoryTarget.Component });
HZDatePickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.2", type: HZDatePickerComponent, selector: "hz-date-picker", inputs: { dpConfig: "dpConfig" }, outputs: { onDateChange: "onDateChange" }, viewQueries: [{ propertyName: "hzDatePicker", first: true, predicate: ["hzDatePicker"], descendants: true }], ngImport: i0, template: `
    <div #hzDatePicker class="hz-datepicker-container"  *ngIf="viewLoaded">
      <div class="hz-datepicker-inner">
          <div class="days">
              <div class="days-prev">
                  <button class="dp-button dp-button-prev {{dpConfig?.navBtnClasses}}" (click)="onMonthNavClick(MONTH_NAVS.PREV)"><<</button>
              </div>
              <div class="days-inner">
                  <div *ngFor="let btn of daysOfMonth" class="day-item">
                      <div [style.display]="dpConfig?.showDays? 'block' : 'none'" class="weekday" [ngClass]="{'is-weekend': btn.isWeekend}">
                          {{btn.date | date: dpConfig?.dayFormat}}
                      </div>
                      <button 
                          class="dp-button dp-button-day {{dpConfig?.btnClasses}} {{btn.isSelected? dpConfig?.selectedItemClass : ''}}"
                          (click)="onDateClick(btn)">
                          {{btn.text}}
                      </button>
                  </div>
                  
              </div>
              <div class="days-next">
                  <button class="dp-button dp-button-next {{dpConfig?.navBtnClasses}}" (click)="onMonthNavClick(MONTH_NAVS.NEXT)">>></button>
              </div>
          </div>
          <h4 class="text-center selected-date">
              {{selectedDate | date : dpConfig?.selectedDateFormat}}
          </h4>
      </div>
  </div>
  `, isInline: true, styles: [".hz-datepicker-container{max-width:400px;margin:0 auto}.hz-datepicker-container .hz-datepicker-inner .days{display:flex;flex-direction:row}.hz-datepicker-container .hz-datepicker-inner .days .days-next,.hz-datepicker-container .hz-datepicker-inner .days .days-prev{align-self:flex-end;padding-bottom:10px}.hz-datepicker-container .hz-datepicker-inner .days .days-prev{justify-content:flex-start}.hz-datepicker-container .hz-datepicker-inner .days .days-next{justify-content:flex-end}.hz-datepicker-container .hz-datepicker-inner .days .days-inner{margin:0 4px;overflow-y:hidden;overflow-x:auto;white-space:nowrap;max-width:100%;padding-bottom:10px}.hz-datepicker-container .hz-datepicker-inner .days .day-item{text-align:center;flex:1;display:inline-block}.hz-datepicker-container .hz-datepicker-inner .days .day-item .weekday.is-weekend{color:orange}.hz-datepicker-container .hz-datepicker-inner .days .day-item .dp-button-day.selected{font-weight:800}.hz-datepicker-container .hz-datepicker-inner .selected-date{margin:10px 0}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.DatePipe, name: "date" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.2", ngImport: i0, type: HZDatePickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hz-date-picker', template: `
    <div #hzDatePicker class="hz-datepicker-container"  *ngIf="viewLoaded">
      <div class="hz-datepicker-inner">
          <div class="days">
              <div class="days-prev">
                  <button class="dp-button dp-button-prev {{dpConfig?.navBtnClasses}}" (click)="onMonthNavClick(MONTH_NAVS.PREV)"><<</button>
              </div>
              <div class="days-inner">
                  <div *ngFor="let btn of daysOfMonth" class="day-item">
                      <div [style.display]="dpConfig?.showDays? 'block' : 'none'" class="weekday" [ngClass]="{'is-weekend': btn.isWeekend}">
                          {{btn.date | date: dpConfig?.dayFormat}}
                      </div>
                      <button 
                          class="dp-button dp-button-day {{dpConfig?.btnClasses}} {{btn.isSelected? dpConfig?.selectedItemClass : ''}}"
                          (click)="onDateClick(btn)">
                          {{btn.text}}
                      </button>
                  </div>
                  
              </div>
              <div class="days-next">
                  <button class="dp-button dp-button-next {{dpConfig?.navBtnClasses}}" (click)="onMonthNavClick(MONTH_NAVS.NEXT)">>></button>
              </div>
          </div>
          <h4 class="text-center selected-date">
              {{selectedDate | date : dpConfig?.selectedDateFormat}}
          </h4>
      </div>
  </div>
  `, styles: [".hz-datepicker-container{max-width:400px;margin:0 auto}.hz-datepicker-container .hz-datepicker-inner .days{display:flex;flex-direction:row}.hz-datepicker-container .hz-datepicker-inner .days .days-next,.hz-datepicker-container .hz-datepicker-inner .days .days-prev{align-self:flex-end;padding-bottom:10px}.hz-datepicker-container .hz-datepicker-inner .days .days-prev{justify-content:flex-start}.hz-datepicker-container .hz-datepicker-inner .days .days-next{justify-content:flex-end}.hz-datepicker-container .hz-datepicker-inner .days .days-inner{margin:0 4px;overflow-y:hidden;overflow-x:auto;white-space:nowrap;max-width:100%;padding-bottom:10px}.hz-datepicker-container .hz-datepicker-inner .days .day-item{text-align:center;flex:1;display:inline-block}.hz-datepicker-container .hz-datepicker-inner .days .day-item .weekday.is-weekend{color:orange}.hz-datepicker-container .hz-datepicker-inner .days .day-item .dp-button-day.selected{font-weight:800}.hz-datepicker-container .hz-datepicker-inner .selected-date{margin:10px 0}\n"] }]
        }], ctorParameters: function () { return [{ type: NgxHzDatepickerComponent }]; }, propDecorators: { hzDatePicker: [{
                type: ViewChild,
                args: ['hzDatePicker']
            }], dpConfig: [{
                type: Input,
                args: ['dpConfig']
            }], onDateChange: [{
                type: Output
            }] } });

// export class NgxHzDatepickerModule { }
class HZDatePickerModule {
}
HZDatePickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.2", ngImport: i0, type: HZDatePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
HZDatePickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.2", ngImport: i0, type: HZDatePickerModule, declarations: [HZDatePickerComponent], imports: [CommonModule], exports: [HZDatePickerComponent] });
HZDatePickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.2", ngImport: i0, type: HZDatePickerModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.2", ngImport: i0, type: HZDatePickerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        HZDatePickerComponent
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        HZDatePickerComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of ngx-hz-datepicker
 */

/**
 * Generated bundle index. Do not edit.
 */

export { HZDatePickerComponent, HZDatePickerModule, NgxHzDatepickerComponent };
//# sourceMappingURL=ngx-hz-datepicker.mjs.map
