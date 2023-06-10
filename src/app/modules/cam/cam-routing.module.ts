import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './pages/example/example.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    //component: ExampleComponent
    component: MainComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CamRoutingModule { }
