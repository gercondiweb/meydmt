import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoEspecialidadComponent } from './tecnico-especialidad.component';

describe('TecnicoEspecialidadComponent', () => {
  let component: TecnicoEspecialidadComponent;
  let fixture: ComponentFixture<TecnicoEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecnicoEspecialidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TecnicoEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
