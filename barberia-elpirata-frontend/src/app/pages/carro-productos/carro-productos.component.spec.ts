import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarroProductosComponent } from './carro-productos.component';

describe('CarroProductosComponent', () => {
  let component: CarroProductosComponent;
  let fixture: ComponentFixture<CarroProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarroProductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarroProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
