import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppRoutingModule} from './app-routing.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { IconButtonComponent } from './components/widgets/icon-button/icon-button.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuComponent} from './components/menu/menu.component';
import {PpBreadcrumbsModule} from '@miesil/pp-breadcrumbs';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { SignInComponent } from './components/sign-in/sign-in.component';
import {LoadingIndicatorComponent} from './components/widgets/loading-indicator/loading-indicator.component';
import { NotificationBarComponent } from './components/notification-bar/notification-bar.component';
import {NotificationService} from './_service/notification.service';


// AoT requires an exported function for factories
// tslint:disable-next-line:typedef
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DashboardComponent,
    TopBarComponent,
    SignUpComponent,
    IconButtonComponent,
    MenuComponent,
    SignInComponent,
    LoadingIndicatorComponent,
    NotificationBarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PpBreadcrumbsModule,
    AngularMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    OverlayModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
