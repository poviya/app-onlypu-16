import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAdModalComponent } from './post-ad-modal.component';

describe('PostAdModalComponent', () => {
  let component: PostAdModalComponent;
  let fixture: ComponentFixture<PostAdModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAdModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
