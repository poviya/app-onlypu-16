import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZegoCloudComponent } from './zego-cloud.component';

describe('ZegoCloudComponent', () => {
  let component: ZegoCloudComponent;
  let fixture: ComponentFixture<ZegoCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZegoCloudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZegoCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
