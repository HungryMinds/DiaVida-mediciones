import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamperdetailComponent } from './camperdetail.component';

describe('CamperdetailComponent', () => {
  let component: CamperdetailComponent;
  let fixture: ComponentFixture<CamperdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamperdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamperdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
