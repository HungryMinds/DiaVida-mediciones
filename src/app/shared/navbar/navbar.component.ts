import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent {
  constructor(private _location: Location) {}
  @Input() title: string;
  @Input() subtitle: string;
  @Input() isGoingBack: boolean;
  goBack() {
    this._location.back();
  }
}
