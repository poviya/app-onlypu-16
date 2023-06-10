import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPromoteComponent } from './list-promote.component';

describe('ListPromoteComponent', () => {
  let component: ListPromoteComponent;
  let fixture: ComponentFixture<ListPromoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPromoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPromoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
