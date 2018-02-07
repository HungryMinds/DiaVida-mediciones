import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampistService } from '../../../core/services/campist.service';
@Component({
  selector: 'app-edit-campista',
  templateUrl: './edit-campista.component.html',
  styleUrls: ['./edit-campista.component.scss']
})
export class EditCampistaComponent implements OnInit {
  camperId: any;

  constructor(private route: ActivatedRoute, private router: Router, private campistService: CampistService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.camperId = params.id;
    });
    const camper = this.campistService.getSingleCampist(this.camperId).subscribe(res => {
      console.log(res);
    });
  }
}
