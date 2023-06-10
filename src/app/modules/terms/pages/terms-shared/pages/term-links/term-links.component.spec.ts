import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLinksComponent } from './term-links.component';

describe('TermLinksComponent', () => {
  let component: TermLinksComponent;
  let fixture: ComponentFixture<TermLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermLinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
