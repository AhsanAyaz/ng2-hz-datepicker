# ng2-hz-datepicker

An Angular2 powered horizontal date picker with horizontal scroll.
Purely based on Angular2 & Typescript, no third party libraries involved (yet).

The picker is more suitable for mobile views as I needed this in one of my freelance projects (an angular2 based mobile-web).
Couldn't find a suitable plugin so created my own ;)

## Installation

To install this library, run:

```bash
$ npm install ng2-hz-datepicker --save
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { HZDatePickerModule } from 'ng2-hz-datepicker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // import the datepicker library
    HZDatePickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use the library component in app.component.html -->
<h1>
  {{title}}
</h1>
<hz-date-picker (onDateChange)="myDateChangeHandler($event)" [dpConfig]="myDatePickerConfig"></hz-date-picker>
```

## Properties

property | type | description 
---------|----------|----------
 dpConfig | DpConfig (Interface) | a configuration object to be provided for the datepicker

 ## Methods

method | description 
---------|----------
 onDateChange | an emmitter that is fired when a date button is clicked to select a different date


 ## DpConfig (Interface)

 ```typescript
  btnClasses? : string,
  navBtnClasses?: string,
  showDays?: boolean,
  dayFormat?: string,
  selectedItemClass?: string,
  selectedDateFormat?: string
 ```

 property | type | description 
---------|----------|----------
 btnClasses | string | classes to be applied to individual date buttons
 navBtnClasses | string | classes to be applied to navigation buttons (next month, prev month)
 showDays | boolean | a flag which tells the datepicker whether the Days have to be shown or not
 dayFormat | string | the day format for days to be displayed, defaults to 'E'. valid values are 'E', 'EEE' and 'EEEE'
 selectedItemClass | string | a class(/classes) to be applied to the selected date button
 selectedDateFormat | string | format of the selected date to be shown


## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## Road Map
> Unit Tests

> Weeks View

## Contribution

Please feel free to add features, different themes/UIs , perhaps weeks view etc.
Submit a PR and lets make angular2 world more beautified ;)

## License

MIT © [Ahsan Ayaz](mailto:ahsan.ubitian@gmail.com)
