import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeccionComponent } from './admin-seccion.component';

describe('AdminSeccionComponent', () => {
  let component: AdminSeccionComponent;
  let fixture: ComponentFixture<AdminSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSeccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
