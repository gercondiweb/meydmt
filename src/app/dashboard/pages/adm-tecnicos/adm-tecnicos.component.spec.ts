import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmTecnicosComponent } from './adm-tecnicos.component';

describe('AdmTecnicosComponent', () => {
  let component: AdmTecnicosComponent;
  let fixture: ComponentFixture<AdmTecnicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmTecnicosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
