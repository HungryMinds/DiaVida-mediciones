import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampersListComponent } from './campers-list.component';

describe('CampersListComponent', () => {
  let component: CampersListComponent;
  let fixture: ComponentFixture<CampersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
