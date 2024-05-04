import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNavigateComponent } from './item-navigate.component';

describe('ItemNavigateComponent', () => {
  let component: ItemNavigateComponent;
  let fixture: ComponentFixture<ItemNavigateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemNavigateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
