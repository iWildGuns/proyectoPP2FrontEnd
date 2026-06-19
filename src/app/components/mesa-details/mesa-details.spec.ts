import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaDetails } from './mesa-details';

describe('MesaDetails', () => {
  let component: MesaDetails;
  let fixture: ComponentFixture<MesaDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesaDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(MesaDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
