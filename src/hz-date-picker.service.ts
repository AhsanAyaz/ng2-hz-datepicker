
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class HZDatePickerService implements OnInit{
  constructor() { }

  ngOnInit(){

  }

  /**
   * @author Ahsan Ayaz
   * This function returns an array of custom objects representing days information in the given month
   * @param dateObj{Date}
   * @returns {Array}
   */
  getDaysOfMonth(dateObj = new Date()): Array<any>{
    let days = [];
    let noOfDays = this.daysInMonth(dateObj);
    for(var i=1, len=noOfDays; i<=len; i++){
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
      let currDate = new Date(year,month,date);

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
  isDate(dateObj:Date): boolean {
    var date:any = dateObj ? new Date(dateObj.toString()) : null;
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
  daysInMonth(dateObj:Date, year?:number, month?:number): number {
    year = dateObj? dateObj.getFullYear(): year;
    month = dateObj? dateObj.getMonth(): month;
    let startDate:any = new Date(year, month, 1),
      endDate:any = new Date(year, month + 1, 1);
    let calc:any = (endDate - startDate) / (1000 * 60 * 60 * 24);
    return parseInt(calc, 10);
  }

  /**
   * @author Ahsan Ayaz
   * Calculates the no of weeks in the given date (month)
   * @param dateObj {Date}
   * @returns number of days {number}
   */
  weeksInMonth(dateObj:Date): number {
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth();
    var firstOfMonth = new Date(year, month - 1, 1),
      lastOfMonth = new Date(year, month, 0),
      used = firstOfMonth.getDay() + lastOfMonth.getDate();
    return Math.ceil(used / 7);
  }
}