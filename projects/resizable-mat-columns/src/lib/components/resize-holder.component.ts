import { Component, ElementRef } from "@angular/core";

@Component({
    selector: 'resize-holder',
    template: '',
    styleUrls: ['./resize-holder.component.scss'],
    host: {
        "class": "resize-holder"
    }
})
export class ResizeHolderComponent {

    constructor(private _elementRef: ElementRef) { }
}