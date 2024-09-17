import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmvehiculosComponent } from './admvehiculos.component';

describe('AdmvehiculosComponent', () => {
  let component: AdmvehiculosComponent;
  let fixture: ComponentFixture<AdmvehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmvehiculosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmvehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
