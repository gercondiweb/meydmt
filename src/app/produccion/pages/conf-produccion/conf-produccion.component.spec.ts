import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfProduccionComponent } from './conf-produccion.component';

describe('ConfProduccionComponent', () => {
  let component: ConfProduccionComponent;
  let fixture: ComponentFixture<ConfProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfProduccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
