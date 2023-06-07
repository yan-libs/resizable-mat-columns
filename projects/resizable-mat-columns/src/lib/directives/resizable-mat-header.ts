import { Directive } from "@angular/core";
import { MatHeaderCell } from "@angular/material/table";

@Directive({
  selector: '[resizable-mat-header]'
})
export class ResizableMatHeader extends MatHeaderCell {
}
