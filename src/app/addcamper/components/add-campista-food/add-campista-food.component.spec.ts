import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampistaFoodComponent } from './add-campista-food.component';

describe('AddCampistaFoodComponent', () => {
  let component: AddCampistaFoodComponent;
  let fixture: ComponentFixture<AddCampistaFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCampistaFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCampistaFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
