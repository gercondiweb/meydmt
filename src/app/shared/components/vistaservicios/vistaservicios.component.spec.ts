import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaserviciosComponent } from './vistaservicios.component';

describe('VistaserviciosComponent', () => {
  let component: VistaserviciosComponent;
  let fixture: ComponentFixture<VistaserviciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaserviciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaserviciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
