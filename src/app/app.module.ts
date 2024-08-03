import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { RouterModule } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';

import { PasswordModule } from 'primeng/password';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { UserAuthGuard } from './components/common/guard/user-auth-guard';
import { PaginatorModule } from 'primeng/paginator';
import { HttpInterceptorService } from './services/auth/http-interceptor.service';
import { CardModule } from 'primeng/card';
import { NgOptimizedImage } from '@angular/common';
import { TransformDatePipe } from './pipes/transform-date.pipe';
import { TableModule } from 'primeng/table';
import { TransformDateWithHourPipe } from './pipes/transform-date-with-hour.pipe';
import { ChartModule } from 'primeng/chart';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageModule } from 'primeng/message';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { UiHeaderComponent } from './components/common/components/ui/ui-header/ui-header.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import {FileUploadModule} from "primeng/fileupload";
import {ImageModule} from "primeng/image";
import { FieldsetModule } from 'primeng/fieldset';
import { BadgeModule } from 'primeng/badge';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { HomeComponent } from './components/modules/home/home.component';
import { ProtocolComponent } from './components/modules/protocol/protocol.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    MenuBarComponent,
    MenuItemComponent,
    HeaderBarComponent,
    TransformDatePipe,
    TransformDateWithHourPipe,
    UiHeaderComponent,
    HomeComponent,
    ProtocolComponent,
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
    PaginatorModule,
    CardModule,
    NgOptimizedImage,
    TableModule,
    ChartModule,
    ChipModule,
    SkeletonModule,
    MessageModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    InputTextareaModule,
    ConfirmDialogModule,
    InputSwitchModule,
    FileUploadModule,
    ImageModule,
    FieldsetModule,
    BadgeModule,
    VirtualScrollerModule,
    OverlayPanelModule,
  ],
  providers: [
    UserAuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
