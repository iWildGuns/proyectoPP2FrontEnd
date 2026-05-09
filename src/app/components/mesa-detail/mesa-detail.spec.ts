import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaDetail } from './mesa-detail';

describe('MesaDetail', () => {
  let component: MesaDetail;
  let fixture: ComponentFixture<MesaDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesaDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(MesaDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
