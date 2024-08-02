import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmTiposerviciosComponent } from './adm-tiposervicios.component';

describe('AdmTiposerviciosComponent', () => {
  let component: AdmTiposerviciosComponent;
  let fixture: ComponentFixture<AdmTiposerviciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmTiposerviciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmTiposerviciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
