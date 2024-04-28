import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuBarComponent } from './components/layout/menu-bar/menu-bar.component';
import { AvatarModule } from 'primeng/avatar';
import { MenuItemComponent } from './components/layout/menu-bar/menu-item/menu-item.component';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultComponent } from './components/layout/default/default-component';
import { HeaderBarComponent } from './components/layout/header-bar/header-bar.component';
import { HomeComponent } from './components/modules/home/home.component';
import { DebtorsComponent } from './components/modules/debtors/debtors.component';
import { CreditorsComponent } from './components/modules/creditors/creditors.component';
import { TransactionsComponent } from './components/modules/transactions/transactions.component';
import { SettingsComponent } from './components/modules/settings/settings.component';
import { RouterModule } from '@angular/router';
import { MenagePersonComponent } from './components/common/components/menage-person/menage-person.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { LoginComponent } from './components/modules/login/login.component';
import { LoginPageComponent } from './components/modules/login/login-page/login-page.component';
import { PasswordModule } from 'primeng/password';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { UserAuthGuard } from './components/common/guard/user-auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    MenuBarComponent,
    MenuItemComponent,
    HeaderBarComponent,
    HomeComponent,
    DebtorsComponent,
    CreditorsComponent,
    TransactionsComponent,
    SettingsComponent,
    MenagePersonComponent,
    LoginComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InputTextModule,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    RippleModule,
    MenuModule,
    CheckboxModule,
    InputNumberModule,
    CalendarModule,
    PasswordModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule,
  ],
  providers: [
    UserAuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
