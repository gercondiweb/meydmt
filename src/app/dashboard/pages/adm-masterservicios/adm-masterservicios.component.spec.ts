import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmMasterserviciosComponent } from './adm-masterservicios.component';

describe('AdmMasterserviciosComponent', () => {
  let component: AdmMasterserviciosComponent;
  let fixture: ComponentFixture<AdmMasterserviciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmMasterserviciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmMasterserviciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
