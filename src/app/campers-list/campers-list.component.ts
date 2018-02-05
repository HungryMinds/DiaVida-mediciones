// import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Team } from '../core/services/models/team.enum';
import { CampistService } from '../core/services/campist.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campers-list',
  templateUrl: './campers-list.component.html',
  styleUrls: ['./campers-list.component.scss']
})
export class CampersListComponent implements OnInit {
  displayedColumns = ['group', 'name', 'age'];
  dataSource;

  constructor(
    private cL: CampistService,
    private router: Router
  ) {}

  ngOnInit() {
    debugger;
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
      // PRUEBA
      for (let i = 0; i < 20; i++) {
        campists.push(campists[0]);
      }
      // FIN PRUEBA
      this.dataSource = new MatTableDataSource(campists);
    });
  }

  open(e) {
    if (e.display) {
      this.router.navigate(['camper/add-camper/']);
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue
      .trim() // Remove whitespace
      .toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
