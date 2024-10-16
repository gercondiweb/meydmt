import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmSeccionComponent } from './adm-seccion.component';

describe('AdmSeccionComponent', () => {
  let component: AdmSeccionComponent;
  let fixture: ComponentFixture<AdmSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmSeccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
