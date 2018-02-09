import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Team } from '../core/services/models/team.enum';
import { CampistService } from '../core/services/campist.service';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';
import { Campist } from '../core';
@Component({
  selector: 'app-campers-list',
  templateUrl: './campers-list.component.html',
  styleUrls: ['./campers-list.component.scss']
})
export class CampersListComponent implements OnInit, OnDestroy {
  displayedColumns = ['group', 'name', 'age'];
  dataSource;
  subscriptionCampers;

  constructor(private cL: CampistService, private router: Router) { }

  ngOnInit() {
    let campists = [];
    this.subscriptionCampers = this.cL.getCampists().subscribe(_campists => {
      campists = _campists.map(campist => {
        return {
          group: Team[campist.team],
          name: `${campist.names} ${campist.lastNames}`,
          age: campist.age,
          id: campist.id
        };
      });
      this.dataSource = new MatTableDataSource(campists);
    });
  }

  ngOnDestroy() {
    this.subscriptionCampers.unsubscribe();
  }

  open(e) {
    if (e.display) {
      this.router.navigate(['/camper/add-camper']);
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue
      .trim() // Remove whitespace
      .toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  goToCamper(id) {
    this.router.navigate(['/camperDetail/', id]);
  }
}
