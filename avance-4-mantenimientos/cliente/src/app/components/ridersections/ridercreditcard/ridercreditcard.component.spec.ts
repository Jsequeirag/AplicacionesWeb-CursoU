import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidercreditcardComponent } from './ridercreditcard.component';

describe('RidercreditcardComponent', () => {
  let component: RidercreditcardComponent;
  let fixture: ComponentFixture<RidercreditcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RidercreditcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RidercreditcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
