import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from "@angular/material/table";
import { ResizableMatColumnsModule } from "resizable-mat-columns";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatTableModule,
    ResizableMatColumnsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
