import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmComentsComponent } from './adm-coments.component';

describe('AdmComentsComponent', () => {
  let component: AdmComentsComponent;
  let fixture: ComponentFixture<AdmComentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmComentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmComentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
