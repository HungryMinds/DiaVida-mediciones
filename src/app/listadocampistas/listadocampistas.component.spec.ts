import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadocampistasComponent } from './listadocampistas.component';

describe('ListadocampistasComponent', () => {
  let component: ListadocampistasComponent;
  let fixture: ComponentFixture<ListadocampistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadocampistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadocampistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
