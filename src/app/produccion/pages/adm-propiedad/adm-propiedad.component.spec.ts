import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmPropiedadComponent } from './adm-propiedad.component';

describe('AdmPropiedadComponent', () => {
  let component: AdmPropiedadComponent;
  let fixture: ComponentFixture<AdmPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmPropiedadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
