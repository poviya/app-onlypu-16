import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentMediaComponent } from './recent-media.component';

describe('RecentMediaComponent', () => {
  let component: RecentMediaComponent;
  let fixture: ComponentFixture<RecentMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentMediaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
