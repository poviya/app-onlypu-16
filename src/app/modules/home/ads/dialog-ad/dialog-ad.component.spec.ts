import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdComponent } from './dialog-ad.component';

describe('DialogAdComponent', () => {
  let component: DialogAdComponent;
  let fixture: ComponentFixture<DialogAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
