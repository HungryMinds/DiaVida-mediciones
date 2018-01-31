import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-campers-list',
  templateUrl: './campers-list.component.html',
  styleUrls: ['./campers-list.component.scss']
})
export class CampersListComponent {
  displayedColumns = ['', 'Nombre', 'Edad'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    filterValue = filterValue
      .trim() // Remove whitespace
      .toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

export interface CamperTable {
  group: string;
  name: string;
  age: number;
}

const ELEMENT_DATA: CamperTable[] = [
  {group: 'morado', name: 'Manuel Antonio', age: 13},
  {group: 'morado', name: 'Manuel Antonio', age: 13},
  {group: 'morado', name: 'Manuel Antonio', age: 13},
  {group: 'morado', name: 'Manuel Antonio', age: 13},
  {group: 'morado', name: 'Manuel Antonio', age: 13},
  {group: 'morado', name: 'Manuel Antonio', age: 13},
  {group: 'morado', name: 'Manuel Antonio', age: 13},
  {group: 'morado', name: 'Manuel Antonio', age: 13},
  {group: 'morado', name: 'Manuel Antonio', age: 13},
  {group: 'morado', name: 'Manuel Antonio', age: 13},
  {group: 'morado', name: 'Manuel Antonio', age: 13},
];
