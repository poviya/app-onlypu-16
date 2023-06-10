import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCreditComponent } from './product-credit.component';

describe('ProductCreditComponent', () => {
  let component: ProductCreditComponent;
  let fixture: ComponentFixture<ProductCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCreditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
