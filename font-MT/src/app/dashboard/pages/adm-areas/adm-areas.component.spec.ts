import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmAreasComponent } from './adm-areas.component';

describe('AdmAreasComponent', () => {
  let component: AdmAreasComponent;
  let fixture: ComponentFixture<AdmAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmAreasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
