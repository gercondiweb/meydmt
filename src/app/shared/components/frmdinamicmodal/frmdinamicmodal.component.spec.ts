import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmdinamicmodalComponent } from './frmdinamicmodal.component';

describe('FrmdinamicmodalComponent', () => {
  let component: FrmdinamicmodalComponent;
  let fixture: ComponentFixture<FrmdinamicmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmdinamicmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrmdinamicmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
