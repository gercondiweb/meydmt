import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterserviciosComponent } from './masterservicios.component';

describe('MasterserviciosComponent', () => {
  let component: MasterserviciosComponent;
  let fixture: ComponentFixture<MasterserviciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterserviciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MasterserviciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
