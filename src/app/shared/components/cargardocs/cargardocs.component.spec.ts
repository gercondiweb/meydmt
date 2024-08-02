import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargardocsComponent } from './cargardocs.component';

describe('CargardocsComponent', () => {
  let component: CargardocsComponent;
  let fixture: ComponentFixture<CargardocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargardocsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargardocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
