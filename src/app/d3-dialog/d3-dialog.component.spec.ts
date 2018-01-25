import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3DialogComponent } from './d3-dialog.component';

describe('D3DialogComponent', () => {
  let component: D3DialogComponent;
  let fixture: ComponentFixture<D3DialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3DialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
