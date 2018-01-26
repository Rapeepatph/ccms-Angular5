import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEquipmentsComponent } from './all-equipments.component';

describe('AllEquipmentsComponent', () => {
  let component: AllEquipmentsComponent;
  let fixture: ComponentFixture<AllEquipmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEquipmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
