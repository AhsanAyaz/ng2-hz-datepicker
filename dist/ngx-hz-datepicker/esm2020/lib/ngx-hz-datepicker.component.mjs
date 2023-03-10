import { Component, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./ngx-hz-datepicker.service";
import * as i2 from "@angular/common";
export class HZDatePickerComponent {
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
HZDatePickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.2", ngImport: i0, type: HZDatePickerComponent, deps: [{ token: i1.NgxHzDatepickerComponent }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: function () { return [{ type: i1.NgxHzDatepickerComponent }]; }, propDecorators: { hzDatePicker: [{
                type: ViewChild,
                args: ['hzDatePicker']
            }], dpConfig: [{
                type: Input,
                args: ['dpConfig']
            }], onDateChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWh6LWRhdGVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWh6LWRhdGVwaWNrZXIvc3JjL2xpYi9uZ3gtaHotZGF0ZXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQXFDLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBMEZySCxNQUFNLE9BQU8scUJBQXFCO0lBY2hDLFlBQW9CLFNBQW1DO1FBQW5DLGNBQVMsR0FBVCxTQUFTLENBQTBCO1FBWDdDLGlCQUFZLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEUsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUU1QixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsZ0JBQVcsR0FBZSxFQUFFLENBQUM7UUFDN0IsaUJBQVksR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ2hDLGVBQVUsR0FBUTtZQUNoQixJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxVQUFVO1NBQ2pCLENBQUE7UUFDTyxvQkFBZSxHQUFrQixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDSCxDQUFDO0lBRTVELFFBQVE7SUFFUixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVEOzs7T0FHRztJQUNILHNCQUFzQjtRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxD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QUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3BFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1QyxDQUFDOztrSEF2RlUscUJBQXFCO3NHQUFyQixxQkFBcUIsaVBBM0V0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2QlQ7MkZBOENVLHFCQUFxQjtrQkE3RWpDLFNBQVM7K0JBQ0UsZ0JBQWdCLFlBQ2hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCVDsrR0ErQzBCLFlBQVk7c0JBQXRDLFNBQVM7dUJBQUMsY0FBYztnQkFDTixRQUFRO3NCQUExQixLQUFLO3VCQUFDLFVBQVU7Z0JBQ1AsWUFBWTtzQkFBckIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3hIekRhdGVwaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL25neC1oei1kYXRlcGlja2VyLnNlcnZpY2UnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgRFBDb25maWcge1xuICBidG5DbGFzc2VzPzogc3RyaW5nLFxuICBuYXZCdG5DbGFzc2VzPzogc3RyaW5nLFxuICBzaG93RGF5cz86IGJvb2xlYW4sXG4gIGRheUZvcm1hdD86IHN0cmluZyxcbiAgc2VsZWN0ZWRJdGVtQ2xhc3M/OiBzdHJpbmcsXG4gIHNlbGVjdGVkRGF0ZUZvcm1hdD86IHN0cmluZ1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdoei1kYXRlLXBpY2tlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAjaHpEYXRlUGlja2VyIGNsYXNzPVwiaHotZGF0ZXBpY2tlci1jb250YWluZXJcIiAgKm5nSWY9XCJ2aWV3TG9hZGVkXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaHotZGF0ZXBpY2tlci1pbm5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXlzXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXlzLXByZXZcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcC1idXR0b24gZHAtYnV0dG9uLXByZXYge3tkcENvbmZpZz8ubmF2QnRuQ2xhc3Nlc319XCIgKGNsaWNrKT1cIm9uTW9udGhOYXZDbGljayhNT05USF9OQVZTLlBSRVYpXCI+PDw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXlzLWlubmVyXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBidG4gb2YgZGF5c09mTW9udGhcIiBjbGFzcz1cImRheS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBbc3R5bGUuZGlzcGxheV09XCJkcENvbmZpZz8uc2hvd0RheXM/ICdibG9jaycgOiAnbm9uZSdcIiBjbGFzcz1cIndlZWtkYXlcIiBbbmdDbGFzc109XCJ7J2lzLXdlZWtlbmQnOiBidG4uaXNXZWVrZW5kfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7e2J0bi5kYXRlIHwgZGF0ZTogZHBDb25maWc/LmRheUZvcm1hdH19XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJkcC1idXR0b24gZHAtYnV0dG9uLWRheSB7e2RwQ29uZmlnPy5idG5DbGFzc2VzfX0ge3tidG4uaXNTZWxlY3RlZD8gZHBDb25maWc/LnNlbGVjdGVkSXRlbUNsYXNzIDogJyd9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkRhdGVDbGljayhidG4pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHt7YnRuLnRleHR9fVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXlzLW5leHRcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcC1idXR0b24gZHAtYnV0dG9uLW5leHQge3tkcENvbmZpZz8ubmF2QnRuQ2xhc3Nlc319XCIgKGNsaWNrKT1cIm9uTW9udGhOYXZDbGljayhNT05USF9OQVZTLk5FWFQpXCI+Pj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGg0IGNsYXNzPVwidGV4dC1jZW50ZXIgc2VsZWN0ZWQtZGF0ZVwiPlxuICAgICAgICAgICAgICB7e3NlbGVjdGVkRGF0ZSB8IGRhdGUgOiBkcENvbmZpZz8uc2VsZWN0ZWREYXRlRm9ybWF0fX1cbiAgICAgICAgICA8L2g0PlxuICAgICAgPC9kaXY+XG4gIDwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtgXG4gICAgLmh6LWRhdGVwaWNrZXItY29udGFpbmVyIHtcbiAgICAgIG1heC13aWR0aDogNDAwcHg7XG4gICAgICBtYXJnaW46IDAgYXV0bztcbiAgICB9XG4gICAgLmh6LWRhdGVwaWNrZXItY29udGFpbmVyIC5oei1kYXRlcGlja2VyLWlubmVyIC5kYXlzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIH1cbiAgICAuaHotZGF0ZXBpY2tlci1jb250YWluZXIgLmh6LWRhdGVwaWNrZXItaW5uZXIgLmRheXMgLmRheXMtbmV4dCwgLmh6LWRhdGVwaWNrZXItY29udGFpbmVyIC5oei1kYXRlcGlja2VyLWlubmVyIC5kYXlzIC5kYXlzLXByZXYge1xuICAgICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XG4gICAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbiAgICB9XG4gICAgLmh6LWRhdGVwaWNrZXItY29udGFpbmVyIC5oei1kYXRlcGlja2VyLWlubmVyIC5kYXlzIC5kYXlzLXByZXYge1xuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgIH1cbiAgICAuaHotZGF0ZXBpY2tlci1jb250YWluZXIgLmh6LWRhdGVwaWNrZXItaW5uZXIgLmRheXMgLmRheXMtbmV4dCB7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgIH1cbiAgICAuaHotZGF0ZXBpY2tlci1jb250YWluZXIgLmh6LWRhdGVwaWNrZXItaW5uZXIgLmRheXMgLmRheXMtaW5uZXIge1xuICAgICAgbWFyZ2luOiAwIDRweDtcbiAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcbiAgICAgIG92ZXJmbG93LXg6IGF1dG87XG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgICAgcGFkZGluZy1ib3R0b206IDEwcHg7XG4gICAgfVxuICAgIC5oei1kYXRlcGlja2VyLWNvbnRhaW5lciAuaHotZGF0ZXBpY2tlci1pbm5lciAuZGF5cyAuZGF5LWl0ZW0ge1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgZmxleDogMTtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB9XG4gICAgLmh6LWRhdGVwaWNrZXItY29udGFpbmVyIC5oei1kYXRlcGlja2VyLWlubmVyIC5kYXlzIC5kYXktaXRlbSAud2Vla2RheS5pcy13ZWVrZW5kIHtcbiAgICAgIGNvbG9yOiBvcmFuZ2U7XG4gICAgfVxuICAgIC5oei1kYXRlcGlja2VyLWNvbnRhaW5lciAuaHotZGF0ZXBpY2tlci1pbm5lciAuZGF5cyAuZGF5LWl0ZW0gLmRwLWJ1dHRvbi1kYXkuc2VsZWN0ZWQge1xuICAgICAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgICB9XG4gICAgLmh6LWRhdGVwaWNrZXItY29udGFpbmVyIC5oei1kYXRlcGlja2VyLWlubmVyIC5zZWxlY3RlZC1kYXRlIHtcbiAgICAgIG1hcmdpbjogMTBweCAwO1xuICAgIH1cblxuICBcbiAgYF1cbn0pXG5leHBvcnQgY2xhc3MgSFpEYXRlUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgnaHpEYXRlUGlja2VyJykgaHpEYXRlUGlja2VyOiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoJ2RwQ29uZmlnJykgZHBDb25maWc6IERQQ29uZmlnIHwgdW5kZWZpbmVkO1xuICBAT3V0cHV0KCkgb25EYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHZpZXdMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZGF5Rm9ybWF0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGlzQ2FsbEluUHJvZ3Jlc3M6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZGF5c09mTW9udGg6IEFycmF5PGFueT4gPSBbXTtcbiAgc2VsZWN0ZWREYXRlOiBEYXRlID0gbmV3IERhdGUoKTtcbiAgTU9OVEhfTkFWUzogYW55ID0ge1xuICAgIE5FWFQ6ICduZXh0JyxcbiAgICBQUkVWOiAncHJldmlvdXMnXG4gIH1cbiAgcHJpdmF0ZSB2YWxpZERheUZvcm1hdHM6IEFycmF5PHN0cmluZz4gPSBbXCJFXCIsIFwiRUVFXCIsIFwiRUVFRVwiXTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkcFNlcnZpY2U6IE5neEh6RGF0ZXBpY2tlckNvbXBvbmVudCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnVwZGF0ZURhdGVCdG5zKCk7XG4gICAgdGhpcy5zZXREZWZhdWx0Q29uZmlnVmFsdWVzKCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnZpZXdMb2FkZWQgPSB0cnVlO1xuICAgIH0sIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBhdXRob3IgQWhzYW4gQXlhelxuICAgKiBTZXRzIHRoZSBpbml0YWwgY29uZmlnIHByb3BlcnRpZXMgdG8gYmUgdXNlZCBieSB0aGUgZGF0ZXBpY2tlciB0ZW1wbGF0ZVxuICAgKi9cbiAgc2V0RGVmYXVsdENvbmZpZ1ZhbHVlcygpIHtcbiAgICB0aGlzLmRwQ29uZmlnID0gdGhpcy5kcENvbmZpZyB8fCB7fTtcbiAgICB0aGlzLmRwQ29uZmlnLmRheUZvcm1hdCA9IHRoaXMuZHBDb25maWcuZGF5Rm9ybWF0ID8gdGhpcy5kcENvbmZpZy5kYXlGb3JtYXQgOiAnRSc7XG4gICAgaWYgKHRoaXMudmFsaWREYXlGb3JtYXRzLmluZGV4T2YodGhpcy5kcENvbmZpZy5kYXlGb3JtYXQpID09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRheSBmb3JtYXQgaW4gZHBDb25maWcsIHN1cHBvcnRlZCBmb3JtYXRzIGFyZSA9IFwiICsgdGhpcy52YWxpZERheUZvcm1hdHMuam9pbigpKTtcbiAgICB9XG4gICAgdGhpcy5kcENvbmZpZy5zZWxlY3RlZERhdGVGb3JtYXQgPSB0aGlzLmRwQ29uZmlnLnNlbGVjdGVkRGF0ZUZvcm1hdCA/IHRoaXMuZHBDb25maWcuc2VsZWN0ZWREYXRlRm9ybWF0IDogJ2Z1bGxEYXRlJztcbiAgICB0aGlzLmRwQ29uZmlnLnNlbGVjdGVkSXRlbUNsYXNzID0gdGhpcy5kcENvbmZpZy5zZWxlY3RlZEl0ZW1DbGFzcyA/IHRoaXMuZHBDb25maWcuc2VsZWN0ZWRJdGVtQ2xhc3MgKyAnIHNlbGVjdGVkJyA6ICdzZWxlY3RlZCc7XG4gIH1cblxuICAvKipcbiAgICogQGF1dGhvciBBaHNhbiBBeWF6XG4gICAqIFRoaXMgZnVuY3Rpb24gaXMgdHJpZ2dlcmVkIHdoZW4gYSBkYXRlIGlzIGNsaWNrZWQgZnJvbSB0aGUgZGF0ZXMgbGlzdFxuICAgKiBAcGFyYW0gZGF5QnRuIFxuICAgKi9cbiAgb25EYXRlQ2xpY2soZGF5QnRuOiBhbnkpIHtcbiAgICB0aGlzLmRheXNPZk1vbnRoLmZvckVhY2goKGJ0bikgPT4ge1xuICAgICAgYnRuLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB9KTtcbiAgICBkYXlCdG4uaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgdGhpcy5zZWxlY3RlZERhdGUgPSBkYXlCdG4uZGF0ZTtcbiAgICB0aGlzLm9uRGF0ZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWREYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAYXV0aG9yIEFoc2FuIEF5YXpcbiAgICogVGhpcyBmdW5jdGlvbiB1cGRhdGVzIHRoZSBidXR0b25zIHRvIGRpc3BsYXkgdXNpbmcgdGhlIGN1cnJlbnQgZGF0ZVxuICAgKiBAcGFyYW0gZGF0ZSBcbiAgICovXG4gIHVwZGF0ZURhdGVCdG5zKGRhdGU/OiBEYXRlKSB7XG4gICAgdGhpcy5kYXlzT2ZNb250aCA9IHRoaXMuZHBTZXJ2aWNlLmdldERheXNPZk1vbnRoKGRhdGUpO1xuICAgIHRoaXMuaXNDYWxsSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmlzQ2FsbEluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICB9LCAxNTAwKVxuICB9XG5cbiAgLyoqXG4gICAqIEBhdXRob3IgQWhzYW4gQXlhelxuICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHRyaWdnZXJlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiBhbnkgb2YgdGhlIG5leHQgbW9udGggbmF2IGJ1dHRvbiBvciBwcmV2aW91cyBtb250aCBuYXYgYnV0dG9uXG4gICAqIEZldGNoZXMgdGhlIG5leHQgbW9udGgncyBidXR0b25zIGZyb20gc2VydmljZSBhbmQgdXBkYXRlcyB0aGUgYnV0dG9ucyBvbiB2aWV3LlxuICAgKiBBbHNvIHNldHMgdGhlIHNhbWUgZGF0ZSBvZiB0aGUgbmV4dCBtb250aCBhcyBzZWxlY3RlZCBkYXRlXG4gICAqIEBwYXJhbSB0YXJnZXQgXG4gICAqL1xuICBvbk1vbnRoTmF2Q2xpY2sodGFyZ2V0OiBzdHJpbmcpIHtcbiAgICBsZXQgdGFyZ2V0TW9udGggPSAodGFyZ2V0ID09IHRoaXMuTU9OVEhfTkFWUy5ORVhUKSA/IHRoaXMuc2VsZWN0ZWREYXRlLmdldE1vbnRoKCkgKyAxIDogdGhpcy5zZWxlY3RlZERhdGUuZ2V0TW9udGgoKSAtIDE7XG4gICAgbGV0IGRhdGVUb1NldCA9IHRoaXMuc2VsZWN0ZWREYXRlLmdldERhdGUoKTtcbiAgICBsZXQgdGFyZ2V0TW9udGhEYXlzQ291bnQgPSB0aGlzLmRwU2VydmljZS5kYXlzSW5Nb250aChuZXcgRGF0ZSgpLCB0aGlzLnNlbGVjdGVkRGF0ZS5nZXRGdWxsWWVhcigpLCB0YXJnZXRNb250aCk7XG4gICAgaWYgKGRhdGVUb1NldCA+IHRhcmdldE1vbnRoRGF5c0NvdW50KSB7XG4gICAgICBkYXRlVG9TZXQgPSB0YXJnZXRNb250aERheXNDb3VudDtcbiAgICB9XG4gICAgbGV0IG5lZWRlZERhdGUgPSBuZXcgRGF0ZSh0aGlzLnNlbGVjdGVkRGF0ZS5nZXRGdWxsWWVhcigpLCB0YXJnZXRNb250aCwgZGF0ZVRvU2V0KTtcbiAgICB0aGlzLnVwZGF0ZURhdGVCdG5zKG5lZWRlZERhdGUpO1xuICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gdGhpcy5kYXlzT2ZNb250aFtuZWVkZWREYXRlLmdldERhdGUoKSAtIDFdLmRhdGU7XG4gICAgdGhpcy5vbkRhdGVDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkRGF0ZSk7XG4gIH1cblxufVxuIl19