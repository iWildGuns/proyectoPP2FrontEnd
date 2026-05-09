import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonDetail } from './salon-detail';

describe('SalonDetail', () => {
  let component: SalonDetail;
  let fixture: ComponentFixture<SalonDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalonDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(SalonDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
