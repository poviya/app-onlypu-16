import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRigthComponent } from './search-rigth.component';

describe('SearchRigthComponent', () => {
  let component: SearchRigthComponent;
  let fixture: ComponentFixture<SearchRigthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchRigthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchRigthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
