import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampistaComponent } from './add-campista.component';

describe('AddCampistaComponent', () => {
  let component: AddCampistaComponent;
  let fixture: ComponentFixture<AddCampistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCampistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCampistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
