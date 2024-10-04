import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaltarifaComponent } from './modaltarifa.component';

describe('ModaltarifaComponent', () => {
  let component: ModaltarifaComponent;
  let fixture: ComponentFixture<ModaltarifaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaltarifaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaltarifaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
