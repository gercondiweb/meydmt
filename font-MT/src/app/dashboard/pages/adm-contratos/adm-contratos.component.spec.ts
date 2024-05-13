import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmContratosComponent } from './adm-contratos.component';

describe('AdmContratosComponent', () => {
  let component: AdmContratosComponent;
  let fixture: ComponentFixture<AdmContratosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmContratosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
