import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-campista',
  templateUrl: './add-campista-dosis.component.html',
  styleUrls: ['./add-campista-dosis.component.scss']
})
export class AddCampistaDosisComponent implements OnInit {
  title: string;
  subtitle: string;
  color: '#24a99b';
  isChecked: Boolean = false;
  @Input() checked;
  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();
  camper: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.title = 'Agregar Campista';
    this.subtitle = 'Dosis Basal';
  }

  toogleView(event) {
    this.isChecked = event.checked;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.camper = params;
      console.log('CAMPER', this.camper);
    });
  }
}
