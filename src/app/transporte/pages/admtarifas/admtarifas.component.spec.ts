import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmtarifasComponent } from './admtarifas.component';

describe('AdmtarifasComponent', () => {
  let component: AdmtarifasComponent;
  let fixture: ComponentFixture<AdmtarifasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmtarifasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmtarifasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
