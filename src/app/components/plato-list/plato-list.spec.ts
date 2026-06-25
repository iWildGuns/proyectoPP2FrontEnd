import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatoListComponent } from './plato-list';

describe('PlatoList', () => {
  let component: PlatoListComponent;
  let fixture: ComponentFixture<PlatoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatoListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
