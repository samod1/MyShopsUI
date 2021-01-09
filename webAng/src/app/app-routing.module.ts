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
  ROUTER_PATH_USERSETTINGS
} from './tools/common/common';

const routes: Routes = [
  {path: ROUTER_PATH_HOME, component: WelcomeComponent},
  {path: ROUTER_PATH_DASHBOARD, component: DashboardComponent,canActivate: [AuthGuard]},
  {path: ROUTER_PATH_SIGNUP, component: SignUpComponent},
  {path: ROUTER_PATH_SIGNIN, component: SignInComponent},
  {path: ROUTER_PATH_REGISTER, component: RegisterComponent},
  {path: ROUTER_PATH_USERSETTINGS,component: UserSettingsComponent,canActivate: [AuthGuard]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
