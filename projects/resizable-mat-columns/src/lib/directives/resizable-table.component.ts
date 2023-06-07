import {
  AfterViewInit,
  ContentChildren,
  Directive,
  ElementRef, Input,
  OnDestroy,
  OnInit,
  QueryList, Renderer2
} from "@angular/core";
import { ResizableMatHeader } from "./resizable-mat-header";
import { MatHeaderCell } from "@angular/material/table";
import { debounceTime, Subject, takeUntil } from "rxjs";

@Directive({
  selector: 'table[resizable]',
})
export class ResizableTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroyed = new Subject<void>()

  /**
   * List of resizable columns
   */
  @ContentChildren(ResizableMatHeader, { read: ElementRef })
  private columnsRef!: QueryList<ElementRef>;

  /**
   * List of additional columns (For example: sticky)
   */
  @ContentChildren(MatHeaderCell, { read: ElementRef })
  private additionalColumnsRef!: QueryList<ElementRef>;

  /**
   * Minimum width of columns
   */
  @Input('min-columns-width')
  minColumnWidth: number = 50;

  /**
   * Resize handle class
   */
  @Input('resize-handle-class')
  resizeHandleClass: string = "resize-holder";

  /**
   * Is button was pressed?
   */
  private pressed!: boolean;

  /**
   * Table container(parent of the table)
   */
  private tableContainer!: HTMLElement;

  /**
   * Start press coordinates
   */
  private startX!: number;

  /**
   * List of width columns before resized
   */
  private fixedWidthList: number[] = []

  /**
   * Realize 'MouseMove' callback
   */
  private mouseMoveUnlisten!: () => void;

  constructor(
    private renderer: Renderer2,
    private table: ElementRef
  ) {
    this.tableContainer = this.renderer.parentNode(table.nativeElement);
  }

  ngOnInit() {
    this.renderer.setStyle(this.table.nativeElement, "table-layout", `fixed`);
    this.renderer.setStyle(this.table.nativeElement, "border-collapse", `collapse`);
    this.renderer.setStyle(this.table.nativeElement, "width", `${1}px`);
  }

  ngAfterViewInit() {
    this.columnsRef
      .changes
      .pipe(debounceTime(200), takeUntil(this.destroyed))
      .subscribe(() => {
        this.columnsRef.forEach((item, index) => {
          const resizer = this.renderer.createElement("div");

          this.renderer.setStyle(item.nativeElement, "position", "relative");
          this.renderer.setStyle(item.nativeElement, "width", `${item.nativeElement.getBoundingClientRect().width}px`);

          this.renderer.addClass(resizer, this.resizeHandleClass);
          this.renderer.appendChild(item.nativeElement, resizer);

          this.renderer.listen(resizer, "mousedown", (event: MouseEvent) => this.onMouseDown(event, item.nativeElement, index));
          this.renderer.listen("document", "mouseup", this.onMouseUp);
        })
      })
  }

  ngOnDestroy(): void {
    this.destroyed.next();
  }

  onMouseDown = (event: MouseEvent, column: HTMLElement, index: number) => {
    this.pressed = true;

    this.startX = event.pageX;
    this.fixedWidthList = this.columnsRef.map(item => item.nativeElement.getBoundingClientRect().width)

    this.mouseMoveUnlisten = this.renderer.listen("document", "mousemove", (event: MouseEvent) => this.onMouseMove(event, column, index));
  };

  onMouseMove = (event: MouseEvent, column: HTMLElement, index: number) => {
    if (this.pressed && event.buttons) {
      this.renderer.addClass(this.table.nativeElement, "resizing");

      const offset = event.pageX - this.startX;

      if (this.fixedWidthList[index] + offset > this.minColumnWidth) {
        //We consider the width of the table, taking into account the change in the width of the column
        const tableWidth =
          this.fixedWidthList.reduce((prev, curr, columnIndex) => columnIndex === index ? (prev + this.fixedWidthList[index] + offset) : prev + curr, 0) +
          this.additionalColumnsRef.reduce((prev, curr) => prev + curr.nativeElement.getBoundingClientRect().width, 0)

        const tableContainerWidth = this.tableContainer.clientWidth;

        if (offset < 0 && tableWidth <= tableContainerWidth) {

          //Difference between actual table width and required width
          const tableOffset = tableContainerWidth - tableWidth

          if (index < this.columnsRef.length - 1) {
            this.renderer.setStyle(this.columnsRef.last.nativeElement, "width", `${this.fixedWidthList[this.fixedWidthList.length - 1] + tableOffset}px`)
          } else {
            this.renderer.setStyle(this.columnsRef.first.nativeElement, "width", `${this.fixedWidthList[0] + tableOffset}px`)
          }
        }

        this.renderer.setStyle(column, "width", `${this.fixedWidthList[index] + offset}px`);
      }
    }
  };

  onMouseUp = (event: MouseEvent) => {
    if (this.pressed) {
      this.pressed = false;
      this.renderer.removeClass(this.table.nativeElement, "resizing");

      this.mouseMoveUnlisten();
    }
  };
}
