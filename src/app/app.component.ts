import { Component } from '@angular/core';

export interface DemoElement {
  cell_1: string;
  cell_2: string;
  cell_3: string;
  cell_4: string;
}

const ELEMENT_DATA: DemoElement[] = [
  {cell_1: 'Cell 1', cell_2: 'Cell 2', cell_3: 'Cell 3', cell_4: 'Cell 4'},
  {cell_1: 'Cell 1', cell_2: 'Cell 2', cell_3: 'Cell 3', cell_4: 'Cell 4'},
  {cell_1: 'Cell 1', cell_2: 'Cell 2', cell_3: 'Cell 3', cell_4: 'Cell 4'},
  {cell_1: 'Cell 1', cell_2: 'Cell 2', cell_3: 'Cell 3', cell_4: 'Cell 4'},
  {cell_1: 'Cell 1', cell_2: 'Cell 2', cell_3: 'Cell 3', cell_4: 'Cell 4'},
  {cell_1: 'Cell 1', cell_2: 'Cell 2', cell_3: 'Cell 3', cell_4: 'Cell 4'},
  {cell_1: 'Cell 1', cell_2: 'Cell 2', cell_3: 'Cell 3', cell_4: 'Cell 4'},
  {cell_1: 'Cell 1', cell_2: 'Cell 2', cell_3: 'Cell 3', cell_4: 'Cell 4'},
  {cell_1: 'Cell 1', cell_2: 'Cell 2', cell_3: 'Cell 3', cell_4: 'Cell 4'},
  {cell_1: 'Cell 1', cell_2: 'Cell 2', cell_3: 'Cell 3', cell_4: 'Cell 4'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: string[] = ['cell_1', 'cell_2', 'cell_3', 'cell_4'];
  dataSource = ELEMENT_DATA;
}
