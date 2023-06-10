import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainManageComponent } from './main-manage.component';

describe('MainManageComponent', () => {
  let component: MainManageComponent;
  let fixture: ComponentFixture<MainManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
