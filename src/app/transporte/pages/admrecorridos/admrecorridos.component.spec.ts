import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmrecorridosComponent } from './admrecorridos.component';

describe('AdmrecorridosComponent', () => {
  let component: AdmrecorridosComponent;
  let fixture: ComponentFixture<AdmrecorridosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmrecorridosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmrecorridosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
