import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './components/layout/default/default-component';

import { HomeComponent } from './components/modules/home/home.component';
import { ProtocolComponent } from './components/modules/protocol/protocol.component';



const routes: Routes = [
  {
    path: '', component: DefaultComponent, children: [
      {path: '', component: HomeComponent, },
      {path: 'protocols', component: ProtocolComponent, },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
