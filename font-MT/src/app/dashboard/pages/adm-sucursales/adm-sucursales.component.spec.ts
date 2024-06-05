import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmSucursalesComponent } from './adm-sucursales.component';

describe('AdmSucursalesComponent', () => {
  let component: AdmSucursalesComponent;
  let fixture: ComponentFixture<AdmSucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmSucursalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
