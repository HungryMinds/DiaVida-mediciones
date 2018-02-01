import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampistaEsquemaComponent } from './add-campista-esquema.component';

describe('AddCampistaEsquemaComponent', () => {
  let component: AddCampistaEsquemaComponent;
  let fixture: ComponentFixture<AddCampistaEsquemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCampistaEsquemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCampistaEsquemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
