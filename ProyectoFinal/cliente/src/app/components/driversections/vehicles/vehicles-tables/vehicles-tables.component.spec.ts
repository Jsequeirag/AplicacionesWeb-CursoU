import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesTablesComponent } from './vehicles-tables.component';

describe('VehiclesTablesComponent', () => {
  let component: VehiclesTablesComponent;
  let fixture: ComponentFixture<VehiclesTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
