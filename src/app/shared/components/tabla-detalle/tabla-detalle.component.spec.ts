import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDetalleComponent } from './tabla-detalle.component';

describe('TablaDetalleComponent', () => {
  let component: TablaDetalleComponent;
  let fixture: ComponentFixture<TablaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
