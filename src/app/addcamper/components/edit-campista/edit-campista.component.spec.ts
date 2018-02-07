import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCampistaComponent } from './edit-campista.component';

describe('EditCampistaComponent', () => {
  let component: EditCampistaComponent;
  let fixture: ComponentFixture<EditCampistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCampistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCampistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
