import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from "./components/layout/default/default-component";
import {HomeComponent} from "./components/modules/home/home.component";
import {DebtorsComponent} from "./components/modules/debtors/debtors.component";
import {CreditorsComponent} from "./components/modules/creditors/creditors.component";
import {TransactionsComponent} from "./components/modules/transactions/transactions.component";
import {SettingsComponent} from "./components/modules/settings/settings.component";
import {LoginComponent} from "./components/modules/login/login.component";


const routes: Routes = [
  {
    path: '', component: DefaultComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'debtors', component: DebtorsComponent},
      {path: 'creditors', component: CreditorsComponent},
      {path: 'transactions', component: TransactionsComponent},
      {path: 'settings', component: SettingsComponent},

    ]
  },
  {
    path: 'login', component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
