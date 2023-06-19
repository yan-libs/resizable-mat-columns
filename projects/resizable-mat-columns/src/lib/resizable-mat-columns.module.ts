import { NgModule } from '@angular/core';
import { ResizableMatHeader } from "./directives/resizable-mat-header";
import { ResizableTableComponent } from "./directives/resizable-table.component";
import { ResizeHolderComponent } from "./components/resize-holder.component";


@NgModule({
  declarations: [
    ResizableMatHeader,
    ResizableTableComponent,
    ResizeHolderComponent
  ],
  imports: [
  ],
  exports: [
    ResizableMatHeader,
    ResizableTableComponent,
    ResizeHolderComponent
  ]
})
export class ResizableMatColumnsModule { }
