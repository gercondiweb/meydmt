import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmTecnicocontratoComponent } from './adm-tecnicocontrato.component';

describe('AdmTecnicocontratoComponent', () => {
  let component: AdmTecnicocontratoComponent;
  let fixture: ComponentFixture<AdmTecnicocontratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmTecnicocontratoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmTecnicocontratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
