import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablerotranspComponent } from './tablerotransp.component';

describe('TablerotranspComponent', () => {
  let component: TablerotranspComponent;
  let fixture: ComponentFixture<TablerotranspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablerotranspComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablerotranspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
