import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmCampoComponent } from './adm-campo.component';

describe('AdmCampoComponent', () => {
  let component: AdmCampoComponent;
  let fixture: ComponentFixture<AdmCampoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmCampoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmCampoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
