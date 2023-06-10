import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// MODULES
import { ModalModule } from '../../library/modal';
import { SearchModule } from '../search/search.module';
import { MenuOneComponent } from './pages/menu-one/menu.-one.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MenuTwoComponent } from './pages/menu-two/menu-two.component';
import { MenuTreeComponent } from './pages/menu-tree/menu-tree.component';
import { MenuFourComponent } from './pages/menu-four/menu-four.component';
import { MenuZeroComponent } from './pages/menu-zero/menu-zero.component';
import { MenuRightComponent } from './pages/menu-right/menu-right.component';
import { MenuLeftComponent } from './pages/menu-left/menu-left.component';
// COMPONENTES

@NgModule({
  declarations: [
      MenuOneComponent,
      MenuTwoComponent,
      MenuTreeComponent,
      MenuFourComponent,
      MenuZeroComponent,
      MenuRightComponent,
      MenuLeftComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    ModalModule,
    SearchModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    FormsModule, ReactiveFormsModule,
    MenuZeroComponent,
    MenuOneComponent,
    MenuTwoComponent,
    MenuTreeComponent,
    MenuFourComponent,
    MenuRightComponent
    //ModalModule,
    //SearchModule
  ]
})
export class MenuModule { }
