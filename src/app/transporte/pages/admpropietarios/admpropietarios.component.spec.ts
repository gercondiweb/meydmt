import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmpropietariosComponent } from './admpropietarios.component';

describe('AdmpropietariosComponent', () => {
  let component: AdmpropietariosComponent;
  let fixture: ComponentFixture<AdmpropietariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmpropietariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmpropietariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
