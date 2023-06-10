import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { CarouselItemDirective } from './carousel-item.directive';
import { CarouselItemElementDirective } from './carousel-item-element.directive';



@NgModule({
  declarations: [
    CarouselComponent, CarouselItemDirective, CarouselItemElementDirective,
  ],
  exports: [
    CarouselComponent, CarouselItemDirective, CarouselItemElementDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class CarouselModule { }
