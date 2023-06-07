import { NgModule } from '@angular/core';
import { ResizableMatHeader } from "./directives/resizable-mat-header";
import { ResizableTableComponent } from "./directives/resizable-table.component";


@NgModule({
  declarations: [
    ResizableMatHeader,
    ResizableTableComponent
  ],
  imports: [
  ],
  exports: [
    ResizableMatHeader,
    ResizableTableComponent
  ]
})
export class ResizableMatColumnsModule { }
