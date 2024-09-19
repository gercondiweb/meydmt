import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmTipopropiedadComponent } from './adm-tipopropiedad.component';

describe('AdmTipopropiedadComponent', () => {
  let component: AdmTipopropiedadComponent;
  let fixture: ComponentFixture<AdmTipopropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmTipopropiedadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmTipopropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
