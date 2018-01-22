import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServiceDialogComponent } from './list-service-dialog.component';

describe('ListServiceDialogComponent', () => {
  let component: ListServiceDialogComponent;
  let fixture: ComponentFixture<ListServiceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListServiceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
