import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmmaestrosComponent } from './admmaestros.component';

describe('AdmmaestrosComponent', () => {
  let component: AdmmaestrosComponent;
  let fixture: ComponentFixture<AdmmaestrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmmaestrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmmaestrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
