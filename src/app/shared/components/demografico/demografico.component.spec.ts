/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DemograficoComponent } from './demografico.component';

describe('DemograficoComponent', () => {
  let component: DemograficoComponent;
  let fixture: ComponentFixture<DemograficoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemograficoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemograficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
