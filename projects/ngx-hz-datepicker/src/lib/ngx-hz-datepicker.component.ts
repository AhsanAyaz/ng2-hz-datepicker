
import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { NgxHzDatepickerComponent } from './ngx-hz-datepicker.service';


export interface DPConfig {
  btnClasses?: string,
  navBtnClasses?: string,
  showDays?: boolean,
  dayFormat?: string,
  selectedItemClass?: string,
  selectedDateFormat?: string
}

@Component({
  selector: 'hz-date-picker',
  template: `
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
  `,
  styles: [`
    .hz-datepicker-container {
      max-width: 400px;
      margin: 0 auto;
    }
    .hz-datepicker-container .hz-datepicker-inner .days {
      display: flex;
      flex-direction: row;
    }
    .hz-datepicker-container .hz-datepicker-inner .days .days-next, .hz-datepicker-container .hz-datepicker-inner .days .days-prev {
      align-self: flex-end;
      padding-bottom: 10px;
    }
    .hz-datepicker-container .hz-datepicker-inner .days .days-prev {
      justify-content: flex-start;
    }
    .hz-datepicker-container .hz-datepicker-inner .days .days-next {
      justify-content: flex-end;
    }
    .hz-datepicker-container .hz-datepicker-inner .days .days-inner {
      margin: 0 4px;
      overflow-y: hidden;
      overflow-x: auto;
      white-space: nowrap;
      max-width: 100%;
      padding-bottom: 10px;
    }
    .hz-datepicker-container .hz-datepicker-inner .days .day-item {
      text-align: center;
      flex: 1;
      display: inline-block;
    }
    .hz-datepicker-container .hz-datepicker-inner .days .day-item .weekday.is-weekend {
      color: orange;
    }
    .hz-datepicker-container .hz-datepicker-inner .days .day-item .dp-button-day.selected {
      font-weight: 800;
    }
    .hz-datepicker-container .hz-datepicker-inner .selected-date {
      margin: 10px 0;
    }

  
  `]
})
export class HZDatePickerComponent implements OnInit, AfterViewInit {
  @ViewChild('hzDatePicker') hzDatePicker: ElementRef | undefined;
  @Input('dpConfig') dpConfig: DPConfig | undefined;
  @Output() onDateChange: EventEmitter<Date> = new EventEmitter();
  viewLoaded: boolean = false;
  dayFormat: string | undefined;
  isCallInProgress: boolean = false;
  daysOfMonth: Array<any> = [];
  selectedDate: Date = new Date();
  MONTH_NAVS: any = {
    NEXT: 'next',
    PREV: 'previous'
  }
  private validDayFormats: Array<string> = ["E", "EEE", "EEEE"];
  constructor(private dpService: NgxHzDatepickerComponent) { }

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
  onDateClick(dayBtn: any) {
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
  updateDateBtns(date?: Date) {
    this.daysOfMonth = this.dpService.getDaysOfMonth(date);
    this.isCallInProgress = true;
    setTimeout(() => {
      this.isCallInProgress = false;
    }, 1500)
  }

  /**
   * @author Ahsan Ayaz
   * This function is triggered when the user clicks on any of the next month nav button or previous month nav button
   * Fetches the next month's buttons from service and updates the buttons on view.
   * Also sets the same date of the next month as selected date
   * @param target 
   */
  onMonthNavClick(target: string) {
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
