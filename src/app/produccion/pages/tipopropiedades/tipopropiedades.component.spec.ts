import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipopropiedadesComponent } from './tipopropiedades.component';

describe('TipopropiedadesComponent', () => {
  let component: TipopropiedadesComponent;
  let fixture: ComponentFixture<TipopropiedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipopropiedadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipopropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
