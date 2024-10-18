import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmdocumentosComponent } from './admdocumentos.component';

describe('AdmdocumentosComponent', () => {
  let component: AdmdocumentosComponent;
  let fixture: ComponentFixture<AdmdocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmdocumentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmdocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
