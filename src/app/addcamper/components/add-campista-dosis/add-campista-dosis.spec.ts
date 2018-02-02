import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampistaDosisComponent } from './add-campista-dosis.component';

describe('AddCampistaDosisComponent', () => {
  let component: AddCampistaDosisComponent;
  let fixture: ComponentFixture<AddCampistaDosisComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AddCampistaDosisComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCampistaDosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
