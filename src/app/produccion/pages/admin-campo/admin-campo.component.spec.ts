import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCampoComponent } from './admin-campo.component';

describe('AdminCampoComponent', () => {
  let component: AdminCampoComponent;
  let fixture: ComponentFixture<AdminCampoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCampoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCampoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
