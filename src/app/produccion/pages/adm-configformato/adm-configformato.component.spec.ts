import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmConfigformatoComponent } from './adm-configformato.component';

describe('AdmConfigformatoComponent', () => {
  let component: AdmConfigformatoComponent;
  let fixture: ComponentFixture<AdmConfigformatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmConfigformatoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmConfigformatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
