import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaForm } from './mesa-form';

describe('MesaForm', () => {
  let component: MesaForm;
  let fixture: ComponentFixture<MesaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(MesaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
