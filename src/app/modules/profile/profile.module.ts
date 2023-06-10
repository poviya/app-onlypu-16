import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './pages/header/header.component';
import { ModalModule } from 'src/app/library/modal/modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './pages/menu/menu/menu.component';
import { SuscriptionModule } from './pages/suscription/suscription.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { FooterModule } from '../footer/footer.module';
import { DialogModule } from 'src/app/library/dialog/dialog.module';
import { ReadMoreModule } from 'src/app/library/read-more/read-more.module';
import { TranslateModule } from '@ngx-translate/core';
import { RecentMediaComponent } from './pages/recent-media/recent-media.component';
import { SearchModule } from '../search/search.module';
import { TermsSharedModule } from '../terms/pages/terms-shared/terms-shared.module';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    MenuComponent,
    ProfileComponent,
    RecentMediaComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    SuscriptionModule,
    FooterModule,
    DialogModule,
    ReadMoreModule,
    TranslateModule,
    SearchModule,
    TermsSharedModule
  ],
  //entryComponents: [TipComponent]
})
export class ProfileModule { }
