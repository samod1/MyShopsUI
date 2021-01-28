import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthGuard} from './tools/common/auth.guard';
import {UserSettingsComponent} from './components/user/user-settings/user-settings.component';
import {
  ROUTER_PATH_DASHBOARD, ROUTER_PATH_HOME,
  ROUTER_PATH_REGISTER,
  ROUTER_PATH_SIGNIN,
  ROUTER_PATH_SIGNUP,
  ROUTER_PATH_USERSETTINGS,
  ROUTER_PATH_USERSETTINGS_LOG,
  ROUTER_PATH_USERSETTINGS_OTH,
  ROUTER_PATH_USERSETTINGS_SEC,
  ROUTER_PATH_USERSETTINGS_USER
} from './tools/common/common';
import {UserAddressComponent} from './components/user/user-address/user-address.component';
import {UserSettingsUserComponent} from './components/user/user-settings-user/user-settings-user.component';
import {UserSettingsSecurityComponent} from './components/user/user-settings-security/user-settings-security.component';
import {UserSettingsOtherComponent} from './components/user/user-settings-other/user-settings-other.component';
import {UserSettingsActlogComponent} from './components/user/user-settings-actlog/user-settings-actlog.component';

const routes: Routes = [
  {path: ROUTER_PATH_HOME, component: WelcomeComponent},
  {path: ROUTER_PATH_DASHBOARD, component: DashboardComponent,canActivate: [AuthGuard]},
  {path: ROUTER_PATH_SIGNUP, component: SignUpComponent},
  {path: ROUTER_PATH_SIGNIN, component: SignInComponent},
  {path: ROUTER_PATH_REGISTER, component: RegisterComponent},
  {path: ROUTER_PATH_USERSETTINGS,component: UserSettingsComponent,canActivate: [AuthGuard],children: [
    {path: ROUTER_PATH_USERSETTINGS_USER,component: UserSettingsUserComponent,canActivate: [AuthGuard],outlet: 'navcontent'},
    {path: ROUTER_PATH_USERSETTINGS_SEC,component: UserSettingsSecurityComponent,canActivate: [AuthGuard],outlet: 'navcontent'},
    {path: ROUTER_PATH_USERSETTINGS_OTH,component: UserSettingsOtherComponent,canActivate: [AuthGuard],outlet: 'navcontent'},
    {path: ROUTER_PATH_USERSETTINGS_LOG,component: UserSettingsActlogComponent,canActivate: [AuthGuard],outlet: 'navcontent'}]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
