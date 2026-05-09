import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonConfig } from './salon-config';

describe('SalonConfig', () => {
  let component: SalonConfig;
  let fixture: ComponentFixture<SalonConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalonConfig],
    }).compileComponents();

    fixture = TestBed.createComponent(SalonConfig);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
