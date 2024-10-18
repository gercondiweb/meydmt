import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calendario1Component } from './calendario1.component';

describe('Calendario1Component', () => {
  let component: Calendario1Component;
  let fixture: ComponentFixture<Calendario1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calendario1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Calendario1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
