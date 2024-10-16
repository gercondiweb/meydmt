import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmCamposComponent } from './adm-campos.component';

describe('AdmCamposComponent', () => {
  let component: AdmCamposComponent;
  let fixture: ComponentFixture<AdmCamposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmCamposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmCamposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
