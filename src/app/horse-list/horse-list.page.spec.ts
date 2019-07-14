import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseListPage } from './horse-list.page';

describe('HorseListPage', () => {
  let component: HorseListPage;
  let fixture: ComponentFixture<HorseListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorseListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorseListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
