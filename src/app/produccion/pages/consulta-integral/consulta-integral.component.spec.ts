import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaIntegralComponent } from './consulta-integral.component';

describe('ConsultaIntegralComponent', () => {
  let component: ConsultaIntegralComponent;
  let fixture: ComponentFixture<ConsultaIntegralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaIntegralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaIntegralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
