import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCenterComponent } from './search-center.component';

describe('SearchCenterComponent', () => {
  let component: SearchCenterComponent;
  let fixture: ComponentFixture<SearchCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
