
import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { HZDatePickerService } from './hz-date-picker.service';

export interface DPConfig{
  btnClasses? : string,
  navBtnClasses?: string,
  showDays?: boolean,
  dayFormat?: string,
  selectedItemClass?: string,
  selectedDateFormat?: string
}

@Component({
  selector: 'hz-date-picker',
  templateUrl: 'hz-date-picker.component.html',
  styleUrls: ['hz-date-picker.component.scss']
})
export class HZDatePickerComponent implements OnInit, AfterViewInit {
  @ViewChild('hzDatePicker') hzDatePicker: ElementRef;
  @Input('dpConfig') dpConfig: DPConfig;
  @Output() onDateChange:EventEmitter<Date> = new EventEmitter();
  viewLoaded: boolean = false;
  dayFormat: string;
  isCallInProgress: boolean = false;
  daysOfMonth: Array<any>;
  selectedDate: Date = new Date();
  private MONTH_NAVS:any = {
    NEXT: 'next',
    PREV: 'previous'
  }
  private validDayFormats: Array<string> = ["E", "EEE", "EEEE"];
  constructor(private dpService: HZDatePickerService) { }

  ngOnInit() {

  }

  ngAfterViewInit(){
    this.updateDateBtns();
    this.setDefaultConfigValues();
    this.viewLoaded = true;
  }

  /**
   * @author Ahsan Ayaz
   * Sets the inital config properties to be used by the datepicker template
   */
  setDefaultConfigValues(){
    this.dpConfig = this.dpConfig || {};
    this.dpConfig.dayFormat = this.dpConfig.dayFormat ? this.dpConfig.dayFormat : 'E'; 
    if(this.validDayFormats.indexOf(this.dpConfig.dayFormat) == -1) {
      throw new Error("Invalid day format in dpConfig, supported formats are = " + this.validDayFormats.join());
    }
    this.dpConfig.selectedDateFormat = this.dpConfig.selectedDateFormat? this.dpConfig.selectedDateFormat : 'fullDate';
    this.dpConfig.selectedItemClass = this.dpConfig.selectedItemClass ? this.dpConfig.selectedItemClass + ' selected' : 'selected';
  }

  /**
   * @author Ahsan Ayaz
   * This function is triggered when a date is clicked from the dates list
   * @param dayBtn 
   */
  onDateClick(dayBtn:any){
    this.daysOfMonth.forEach((btn)=>{
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
  updateDateBtns(date?:Date){
    this.daysOfMonth = this.dpService.getDaysOfMonth(date);
    this.isCallInProgress = true;
    setTimeout(()=>{
      this.isCallInProgress = false;
    },1500)
  }

  /**
   * @author Ahsan Ayaz
   * This function is triggered when the user clicks on any of the next month nav button or previous month nav button
   * Fetches the next month's buttons from service and updates the buttons on view.
   * Also sets the same date of the next month as selected date
   * @param target 
   */
  onMonthNavClick(target:string){
    let targetMonth = (target == this.MONTH_NAVS.NEXT) ? this.selectedDate.getMonth() + 1 : this.selectedDate.getMonth() -1;
    let dateToSet = this.selectedDate.getDate();
    let targetMonthDaysCount = this.dpService.daysInMonth(null, this.selectedDate.getFullYear(), targetMonth);
    if(dateToSet > targetMonthDaysCount){
      dateToSet = targetMonthDaysCount;
    }
    let neededDate = new Date(this.selectedDate.getFullYear(), targetMonth, dateToSet);
    this.updateDateBtns(neededDate);
    this.selectedDate = this.daysOfMonth[neededDate.getDate()-1].date;
    this.onDateChange.emit(this.selectedDate);
  }

}
