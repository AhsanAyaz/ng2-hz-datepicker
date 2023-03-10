import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class NgxHzDatepickerComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWh6LWRhdGVwaWNrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1oei1kYXRlcGlja2VyL3NyYy9saWIvbmd4LWh6LWRhdGVwaWNrZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDOztBQUduRCxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DLGdCQUFnQixDQUFDO0lBRWpCLFFBQVE7SUFFUixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxjQUFjLENBQUMsT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFO1FBQ2pDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFFBQVEsRUFBRSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN4QixnREFBZ0Q7WUFDaEQsSUFBSSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQztZQUN0QixJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsdUJBQXVCO1lBQ2pDLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDakMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUM1QjtZQUNELElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDL0IsSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUM5QjtZQUNELElBQUksUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFM0MsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDUixJQUFJLEVBQUUsSUFBSTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzdELFVBQVUsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzthQUNuQyxDQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLE9BQWE7UUFDbEIsSUFBSSxJQUFJLEdBQVEsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzlELE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssU0FBUyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUdEOzs7Ozs7O09BT0c7SUFDSCxXQUFXLENBQUMsT0FBYSxFQUFFLElBQWEsRUFBRSxLQUFjO1FBQ3RELElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzlDLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQzdDLElBQUksSUFBSSxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQzdDLE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztTQUMzRDtRQUNELElBQUksU0FBUyxHQUFRLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQzNDLE9BQU8sR0FBUSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFJLElBQUksR0FBUSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzlELE9BQU8sUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxZQUFZLENBQUMsT0FBYTtRQUN4QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQy9CLElBQUksWUFBWSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUM3QyxXQUFXLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFDdEMsSUFBSSxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDOztxSEFwRlUsd0JBQXdCO3lIQUF4Qix3QkFBd0I7MkZBQXhCLHdCQUF3QjtrQkFEcEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ3hIekRhdGVwaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gIH1cblxuICAvKipcbiAgICogQGF1dGhvciBBaHNhbiBBeWF6XG4gICAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhbiBhcnJheSBvZiBjdXN0b20gb2JqZWN0cyByZXByZXNlbnRpbmcgZGF5cyBpbmZvcm1hdGlvbiBpbiB0aGUgZ2l2ZW4gbW9udGhcbiAgICogQHBhcmFtIGRhdGVPYmp7RGF0ZX1cbiAgICogQHJldHVybnMge0FycmF5fVxuICAgKi9cbiAgZ2V0RGF5c09mTW9udGgoZGF0ZU9iaiA9IG5ldyBEYXRlKCkpOiBBcnJheTxhbnk+IHtcbiAgICBsZXQgZGF5cyA9IFtdO1xuICAgIGxldCBub09mRGF5cyA9IHRoaXMuZGF5c0luTW9udGgoZGF0ZU9iaik7XG4gICAgZm9yICh2YXIgaSA9IDEsIGxlbiA9IG5vT2ZEYXlzOyBpIDw9IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgdGV4dCA9IGkudG9TdHJpbmcoKTtcbiAgICAgIC8vIGdyYWIgY3VycmVudCBkYXRlIGFuZCBjaGVjayBwYXNzZWQgYXJndW1lbnRzLlxuICAgICAgbGV0IGRhdGUsIG1vbnRoLCB5ZWFyO1xuICAgICAgZGF0ZSA9IGk7IC8vc2V0dGluZyB0aGUgZGF0ZSBoZXJlXG4gICAgICBpZiAoIW1vbnRoIHx8IG1vbnRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbW9udGggPSBkYXRlT2JqLmdldE1vbnRoKCk7XG4gICAgICB9XG4gICAgICBpZiAoIXllYXIgfHwgeWVhciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHllYXIgPSBkYXRlT2JqLmdldEZ1bGxZZWFyKCk7XG4gICAgICB9XG4gICAgICBsZXQgY3VyckRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSk7XG5cbiAgICAgIGRheXMucHVzaCh7XG4gICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgIGRhdGU6IGN1cnJEYXRlLFxuICAgICAgICBpc1dlZWtlbmQ6IChjdXJyRGF0ZS5nZXREYXkoKSA9PSA2IHx8IGN1cnJEYXRlLmdldERheSgpID09IDApLFxuICAgICAgICBpc1NlbGVjdGVkOiBkYXRlT2JqLmdldERhdGUoKSA9PSBpXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGRheXM7XG4gIH1cblxuICAvKipcbiAgICogQGF1dGhvciBBaHNhbiBBeWF6XG4gICAqIFJldHVybnMgaWYgdGhlIGRhdGVPYmplY3QgcGFzc2VkIGlzIGFuIGFjdHVhbCBEYXRlXG4gICAqIEBwYXJhbSBkYXRlT2JqIHtEYXRlfVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gaXN0RGF0ZSB2YWx1ZVxuICAgKi9cbiAgaXNEYXRlKGRhdGVPYmo6IERhdGUpOiBib29sZWFuIHtcbiAgICB2YXIgZGF0ZTogYW55ID0gZGF0ZU9iaiA/IG5ldyBEYXRlKGRhdGVPYmoudG9TdHJpbmcoKSkgOiBudWxsO1xuICAgIHJldHVybiAoZGF0ZSAhPT0gbnVsbCkgJiYgIWlzTmFOKGRhdGUpICYmIChkYXRlLmdldERhdGUoKSAhPT0gdW5kZWZpbmVkKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBhdXRob3IgQWhzYW4gQXlhelxuICAgKiBDYWxjdWxhdGVzIHRoZSBubyBvZiBkYXlzIGluIHRoZSBnaXZlbiBkYXRlIG9yIHVzaW5nIGdpdmVuIHllYXIgYW5kIG1vbnRoXG4gICAqIEBwYXJhbSBkYXRlT2JqIHtEYXRlfVxuICAgKiBAcGFyYW0geWVhciB7bnVtYmVyfVxuICAgKiBAcGFyYW0gbW9udGgge251bWJlcn1cbiAgICogQHJldHVybnMgbm8gb2YgZGF5cyB7bnVtYmVyfVxuICAgKi9cbiAgZGF5c0luTW9udGgoZGF0ZU9iajogRGF0ZSwgeWVhcj86IG51bWJlciwgbW9udGg/OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHllYXIgPSBkYXRlT2JqID8gZGF0ZU9iai5nZXRGdWxsWWVhcigpIDogeWVhcjtcbiAgICBtb250aCA9IGRhdGVPYmogPyBkYXRlT2JqLmdldE1vbnRoKCkgOiBtb250aDtcbiAgICBpZiAoeWVhciA9PT0gdW5kZWZpbmVkIHx8IG1vbnRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWWVhciBhbmQgbW9udGggcGFyYW1ldGVycyBhcmUgcmVxdWlyZWQnKTtcbiAgICB9XG4gICAgbGV0IHN0YXJ0RGF0ZTogYW55ID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDEpLFxuICAgICAgZW5kRGF0ZTogYW55ID0gbmV3IERhdGUoeWVhciwgbW9udGggKyAxLCAxKTtcbiAgICBsZXQgY2FsYzogYW55ID0gKGVuZERhdGUgLSBzdGFydERhdGUpIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpO1xuICAgIHJldHVybiBwYXJzZUludChjYWxjLCAxMCk7XG4gIH1cblxuICAvKipcbiAgICogQGF1dGhvciBBaHNhbiBBeWF6XG4gICAqIENhbGN1bGF0ZXMgdGhlIG5vIG9mIHdlZWtzIGluIHRoZSBnaXZlbiBkYXRlIChtb250aClcbiAgICogQHBhcmFtIGRhdGVPYmoge0RhdGV9XG4gICAqIEByZXR1cm5zIG51bWJlciBvZiBkYXlzIHtudW1iZXJ9XG4gICAqL1xuICB3ZWVrc0luTW9udGgoZGF0ZU9iajogRGF0ZSk6IG51bWJlciB7XG4gICAgbGV0IHllYXIgPSBkYXRlT2JqLmdldEZ1bGxZZWFyKCk7XG4gICAgbGV0IG1vbnRoID0gZGF0ZU9iai5nZXRNb250aCgpO1xuICAgIHZhciBmaXJzdE9mTW9udGggPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIDEpLFxuICAgICAgbGFzdE9mTW9udGggPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMCksXG4gICAgICB1c2VkID0gZmlyc3RPZk1vbnRoLmdldERheSgpICsgbGFzdE9mTW9udGguZ2V0RGF0ZSgpO1xuICAgIHJldHVybiBNYXRoLmNlaWwodXNlZCAvIDcpO1xuICB9XG59Il19