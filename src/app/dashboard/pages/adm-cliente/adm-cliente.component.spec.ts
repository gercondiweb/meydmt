import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmClienteComponent } from './adm-cliente.component';

describe('AdmClienteComponent', () => {
  let component: AdmClienteComponent;
  let fixture: ComponentFixture<AdmClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
