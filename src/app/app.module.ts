import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }          from './app.component';
import { FormsModule }           from '@angular/forms';
import { MyFileReaderComponent } from './my-file-reader/my-file-reader.component';

@NgModule({
  imports:      [ BrowserModule,
                  FormsModule ],
  declarations: [ AppComponent,
                  MyFileReaderComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
