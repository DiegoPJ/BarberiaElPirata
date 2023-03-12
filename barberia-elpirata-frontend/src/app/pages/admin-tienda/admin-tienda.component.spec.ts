import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTiendaComponent } from './admin-tienda.component';

describe('AdminTiendaComponent', () => {
  let component: AdminTiendaComponent;
  let fixture: ComponentFixture<AdminTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTiendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
