import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmzonasComponent } from './admzonas.component';

describe('AdmzonasComponent', () => {
  let component: AdmzonasComponent;
  let fixture: ComponentFixture<AdmzonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmzonasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmzonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
