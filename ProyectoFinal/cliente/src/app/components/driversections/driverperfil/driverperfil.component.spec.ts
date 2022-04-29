import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverperfilComponent } from './driverperfil.component';

describe('DriverperfilComponent', () => {
  let component: DriverperfilComponent;
  let fixture: ComponentFixture<DriverperfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverperfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
