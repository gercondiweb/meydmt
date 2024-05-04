import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmMaestroComponent } from './frm-maestro.component';

describe('FrmMaestroComponent', () => {
  let component: FrmMaestroComponent;
  let fixture: ComponentFixture<FrmMaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmMaestroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
