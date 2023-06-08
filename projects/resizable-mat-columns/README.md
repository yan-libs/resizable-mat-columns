# resizable-mat-columns
Turns angular material table columns to resizable

## Installation
#### NPM
```
npm install angular-table-resize
```

## Quick Setup
#### Link style sheets
```html
<link rel="stylesheet" href="resizable-mat-columns.scss">
```

#### Import the module
```ts
import { ResizableMatColumnsModule } from "resizable-mat-columns";

@NgModule({
  declarations: [
   //some declarations
  ],
  imports: [
    //some imports
    ResizableMatColumnsModule
  ],
})
```

On a HTML table tag put the `resizable` directive
```html
<table mat-table resizable>...</table>
```

And every column header change from
```html
<th mat-header-cell *matHeaderCellDef>...</th>
```
to
```html
<th resizable-mat-header *matHeaderCellDef>...</th>
```

That wasn't so hard, isn't it?

## Table parameters
| Name                | Type   | Description                                |
|:--------------------|:-------|:-------------------------------------------|
| min-columns-width   | number | Minimum width of columns. Default 50       |
| resize-handle-class | string | Resize handle class. Default resize-holder |

## Demo
You can try out a demo by [clicking here](https://yan-libs.github.io/resizable-mat-columns/).

## Source
https://github.com/yan-libs/resizable-mat-columns/tree/develop/projects/resizable-mat-columns
