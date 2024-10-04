import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmrutasComponent } from './admrutas.component';

describe('AdmrutasComponent', () => {
  let component: AdmrutasComponent;
  let fixture: ComponentFixture<AdmrutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmrutasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmrutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
