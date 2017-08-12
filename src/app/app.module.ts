import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }          from './app.component';
import { FormsModule }           from '@angular/forms';
import { MyFileReaderComponent } from './my-file-reader/my-file-reader.component';
import { LocationTableComponent } from './location-table/location-table.component';
import { LocationMapValuesPipe } from './pipes/location-map-values.pipe';

@NgModule({
  imports:      [ BrowserModule,
                  FormsModule ],
  declarations: [ AppComponent,
                  MyFileReaderComponent,
                  LocationTableComponent,
                  LocationMapValuesPipe],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
