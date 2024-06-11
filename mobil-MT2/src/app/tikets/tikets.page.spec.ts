import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TiketsPage } from './tikets.page';

describe('TiketsPage', () => {
  let component: TiketsPage;
  let fixture: ComponentFixture<TiketsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TiketsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
