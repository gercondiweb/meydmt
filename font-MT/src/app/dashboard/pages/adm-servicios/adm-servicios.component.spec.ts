import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmServiciosComponent } from './adm-servicios.component';

describe('AdmServiciosComponent', () => {
  let component: AdmServiciosComponent;
  let fixture: ComponentFixture<AdmServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmServiciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
