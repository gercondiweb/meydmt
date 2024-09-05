import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaGroupComponent } from './text-area-group.component';

describe('TextAreaGroupComponent', () => {
  let component: TextAreaGroupComponent;
  let fixture: ComponentFixture<TextAreaGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextAreaGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextAreaGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
