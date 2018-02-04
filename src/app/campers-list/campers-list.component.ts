// import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Team } from '../core/services/models/team.enum';
import { CampistService } from '../core/services/campist.service';
import { Campist } from '../core/services/models/campist.class';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-campers-list',
  templateUrl: './campers-list.component.html',
  styleUrls: ['./campers-list.component.scss']
})
export class CampersListComponent implements OnInit {
  displayedColumns = ['group', 'name', 'age'];
  dataSource;

  constructor(private cL: CampistService) {}

  ngOnInit() {
    let campists = [];
    this.cL.getCampists()
    .forEach((_campists) => {
      campists = _campists.map((campist) => {
        return {
          group: Team[campist.team],
          name: `${campist.names} ${campist.lastNames}`,
          age: campist.age
        };
      });
      this.dataSource = new MatTableDataSource(campists);
    });
  }

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
  { group: Team['morado'], name: 'Manuel Antonio1', age: 13 },
  { group: Team['morado'], name: 'Manuel Antonio2', age: 13 },
  { group: Team['morado'], name: 'Manuel Antonio3', age: 13 },
  { group: Team['morado'], name: 'Manuel Antonio4', age: 13 },
  { group: Team['morado'], name: 'Manuel Antonio5', age: 13 },
  { group: Team['morado'], name: 'Manuel Antonio6', age: 13 },
  { group: Team['morado'], name: 'Manuel Antonio7', age: 13 },
  { group: Team['morado'], name: 'Manuel Antonio8', age: 13 },
  { group: Team['morado'], name: 'Manuel Antonio9', age: 13 },
  { group: Team['morado'], name: 'Manuel Antonio0', age: 13 },
  { group: Team['morado'], name: 'Manuel Antonio1', age: 13 }
];
