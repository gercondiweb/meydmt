import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmEspecialidadComponent } from './adm-especialidad.component';

describe('AdmEspecialidadComponent', () => {
  let component: AdmEspecialidadComponent;
  let fixture: ComponentFixture<AdmEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmEspecialidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
