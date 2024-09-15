import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmgastosComponent } from './admgastos.component';

describe('AdmgastosComponent', () => {
  let component: AdmgastosComponent;
  let fixture: ComponentFixture<AdmgastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmgastosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmgastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
