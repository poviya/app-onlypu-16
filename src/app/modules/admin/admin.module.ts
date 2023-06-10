import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { MenuComponent } from './pages/menu/menu.component';
import { MainComponent } from './pages/main/main.component';

import { FooterModule } from 'src/app/modules/footer/footer.module';
import { MenuTwoComponent } from './pages/menu-two/menu-two.component';
import { ModalModule } from 'src/app/library/modal/modal.module';
import { MenuModule } from '../menu/menu.module';

@NgModule({
  declarations: [MainComponent, MenuComponent, MenuTwoComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ModalModule,
    FooterModule,
    MenuModule,
  ]
})
export class AdminModule { }
