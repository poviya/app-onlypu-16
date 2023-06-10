import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPromoteComponent } from './main-promote.component';

describe('MainPromoteComponent', () => {
  let component: MainPromoteComponent;
  let fixture: ComponentFixture<MainPromoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPromoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPromoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
