import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarroServicioComponent } from './carro-servicio.component';

describe('CarroServicioComponent', () => {
  let component: CarroServicioComponent;
  let fixture: ComponentFixture<CarroServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarroServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarroServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
