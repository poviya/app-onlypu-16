import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ShowHomeComponent } from './show-home/show-home.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      
      /*** Bolivia 1 */
      { path: '', component: ShowHomeComponent},
      { path: 'bolivia', component: ShowHomeComponent},
      { path: 'bolivia/:categorySlug', component: ShowHomeComponent},
      { path: 'bolivia/:categorySlug/:stateCitySlug', component: ShowHomeComponent},
      { path: 'bolivia/:categorySlug/:stateCitySlug/:cityZoneSlug', component: ShowHomeComponent},

      /*** Mexico 2 */
      { path: 'mexico', component: ShowHomeComponent},
      { path: 'mexico/:categorySlug', component: ShowHomeComponent},
      { path: 'mexico/:categorySlug/:stateCitySlug', component: ShowHomeComponent},
      { path: 'mexico/:categorySlug/:stateCitySlug/:cityZoneSlug', component: ShowHomeComponent},

      /*** Peru 3 */
      { path: 'peru', component: ShowHomeComponent},
      { path: 'peru/:categorySlug', component: ShowHomeComponent},
      { path: 'peru/:categorySlug/:stateCitySlug', component: ShowHomeComponent},
      { path: 'peru/:categorySlug/:stateCitySlug/:cityZoneSlug', component: ShowHomeComponent},

       /*** Brasil 4 */
       { path: 'brasil', component: ShowHomeComponent},
       { path: 'brasil/:categorySlug', component: ShowHomeComponent},
       { path: 'brasil/:categorySlug/:stateCitySlug', component: ShowHomeComponent},
       { path: 'brasil/:categorySlug/:stateCitySlug/:cityZoneSlug', component: ShowHomeComponent},

       /*** Argentina 5 */
       { path: 'argentina', component: ShowHomeComponent},
       { path: 'argentina/:categorySlug', component: ShowHomeComponent},
       { path: 'argentina/:categorySlug/:stateCitySlug', component: ShowHomeComponent},
       { path: 'argentina/:categorySlug/:stateCitySlug/:cityZoneSlug', component: ShowHomeComponent},

       /*** Uruguay 6*/
       { path: 'uruguay', component: ShowHomeComponent},
       { path: 'uruguay/:categorySlug', component: ShowHomeComponent},
       { path: 'uruguay/:categorySlug/:stateCitySlug', component: ShowHomeComponent},
       { path: 'uruguay/:categorySlug/:stateCitySlug/:cityZoneSlug', component: ShowHomeComponent},

       /*** Paraguay 7*/
       { path: 'paraguay', component: ShowHomeComponent},
       { path: 'paraguay/:categorySlug', component: ShowHomeComponent},
       { path: 'paraguay/:categorySlug/:stateCitySlug', component: ShowHomeComponent},
       { path: 'paraguay/:categorySlug/:stateCitySlug/:cityZoneSlug', component: ShowHomeComponent},

        /*** Chile 8*/
        { path: 'chile', component: ShowHomeComponent},
        { path: 'chile/:categorySlug', component: ShowHomeComponent},
        { path: 'chile/:categorySlug/:stateCitySlug', component: ShowHomeComponent},
        { path: 'chile/:categorySlug/:stateCitySlug/:cityZoneSlug', component: ShowHomeComponent},

        /*** Ecuador 9*/
        { path: 'ecuador', component: ShowHomeComponent},
        { path: 'ecuador/:categorySlug', component: ShowHomeComponent},
        { path: 'ecuador/:categorySlug/:stateCitySlug', component: ShowHomeComponent},
        { path: 'ecuador/:categorySlug/:stateCitySlug/:cityZoneSlug', component: ShowHomeComponent},

        /*** Colombia 10*/
        { path: 'colombia', component: ShowHomeComponent},
        { path: 'colombia/:categorySlug', component: ShowHomeComponent},
        { path: 'colombia/:categorySlug/:stateCitySlug', component: ShowHomeComponent},
        { path: 'colombia/:categorySlug/:stateCitySlug/:cityZoneSlug', component: ShowHomeComponent},

        /*** Venezuela 11*/
        { path: 'venezuela', component: ShowHomeComponent},
        { path: 'venezuela/:categorySlug', component: ShowHomeComponent},
        { path: 'venezuela/:categorySlug/:stateCitySlug', component: ShowHomeComponent},
        { path: 'venezuela/:categorySlug/:stateCitySlug/:cityZoneSlug', component: ShowHomeComponent},

        /*** Panama 12*/
        { path: 'panama', component: ShowHomeComponent},
        { path: 'panama/:categorySlug', component: ShowHomeComponent},
        { path: 'panama/:categorySlug/:stateCitySlug', component: ShowHomeComponent},
        { path: 'panama/:categorySlug/:stateCitySlug/:cityZoneSlug', component: ShowHomeComponent},

        /*** Costa Rica 13*/
        { path: 'costa-rica', component: ShowHomeComponent},
        { path: 'costa-rica/:categorySlug', component: ShowHomeComponent},
        { path: 'costa-rica/:categorySlug/:stateCitySlug', component: ShowHomeComponent},
        { path: 'costa-rica/:categorySlug/:stateCitySlug/:cityZoneSlug', component: ShowHomeComponent},

        /*** Guatemala 14*/
        { path: 'guatemala', component: ShowHomeComponent},
        { path: 'guatemala/:categorySlug', component: ShowHomeComponent},
        { path: 'guatemala/:categorySlug/:stateCitySlug', component: ShowHomeComponent},
        { path: 'guatemala/:categorySlug/:stateCitySlug/:cityZoneSlug', component: ShowHomeComponent},

        /*** Republica Dominicana 15*/
        { path: 'republica-dominicana', component: ShowHomeComponent},
        { path: 'republica-dominicana/:categorySlug', component: ShowHomeComponent},
        { path: 'republica-dominicana/:categorySlug/:stateCitySlug', component: ShowHomeComponent},
        { path: 'republica-dominicana/:categorySlug/:stateCitySlug/:cityZoneSlug', component: ShowHomeComponent},

        /*** Estados Unidos 16*/
        { path: 'united-states', component: ShowHomeComponent},
        { path: 'united-states/:categorySlug', component: ShowHomeComponent},
        { path: 'united-states/:categorySlug/:stateCitySlug', component: ShowHomeComponent},
        { path: 'united-states/:categorySlug/:stateCitySlug/:cityZoneSlug', component: ShowHomeComponent},

         /*** Estados Unidos 16*/
         { path: 'all', component: ShowHomeComponent},
         { path: 'all/:categorySlug', component: ShowHomeComponent},
         { path: 'all/:categorySlug/:stateCitySlug', component: ShowHomeComponent},
         { path: 'all/:categorySlug/:stateCitySlug/:cityZoneSlug', component: ShowHomeComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdsRoutingModule { }
