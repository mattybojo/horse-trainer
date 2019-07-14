import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseDetailPage } from './horse-detail.page';

describe('HorseDetailPage', () => {
  let component: HorseDetailPage;
  let fixture: ComponentFixture<HorseDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorseDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorseDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
