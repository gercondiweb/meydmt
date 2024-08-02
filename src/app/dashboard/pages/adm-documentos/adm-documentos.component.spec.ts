import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmDocumentosComponent } from './adm-documentos.component';

describe('AdmDocumentosComponent', () => {
  let component: AdmDocumentosComponent;
  let fixture: ComponentFixture<AdmDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmDocumentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
