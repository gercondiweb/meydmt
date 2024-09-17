import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmtipovehiculoComponent } from './admtipovehiculo.component';

describe('AdmtipovehiculoComponent', () => {
  let component: AdmtipovehiculoComponent;
  let fixture: ComponentFixture<AdmtipovehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmtipovehiculoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmtipovehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
