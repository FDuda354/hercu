import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './components/layout/default/default-component';
import { HomeComponent } from './components/modules/home/home.component';
import { DebtorsComponent } from './components/modules/debtors/debtors.component';
import { CreditorsComponent } from './components/modules/creditors/creditors.component';
import { TransactionsComponent } from './components/modules/transactions/transactions.component';
import { SettingsComponent } from './components/modules/settings/settings.component';
import { LoginComponent } from './components/modules/login/login.component';
import { UserAuthGuard } from './components/common/guard/user-auth-guard';


const routes: Routes = [
  {
    path: '', component: DefaultComponent, children: [
      {path: '', component: HomeComponent, canActivate: [UserAuthGuard]},
      {path: 'debtors', component: DebtorsComponent, canActivate: [UserAuthGuard]},
      {path: 'creditors', component: CreditorsComponent, canActivate: [UserAuthGuard]},
      {path: 'transactions', component: TransactionsComponent, canActivate: [UserAuthGuard]},
      {path: 'settings', component: SettingsComponent, canActivate: [UserAuthGuard]},

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
