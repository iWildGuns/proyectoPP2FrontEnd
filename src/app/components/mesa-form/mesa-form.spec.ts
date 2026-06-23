import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesaFormComponent } from './mesa-form';

describe('MesaForm', () => {
  let component: MesaFormComponent;
  let fixture: ComponentFixture<MesaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesaFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MesaFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
