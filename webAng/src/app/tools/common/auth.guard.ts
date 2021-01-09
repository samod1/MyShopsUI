import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService,getLoggedUserName} from '../../_service/authentication.service';
import {ROUTER_PATH_SIGNIN} from './common';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const user = getLoggedUserName();

    if (!user) {
      this.router.navigate([ROUTER_PATH_SIGNIN], {queryParams: {returnUrl: state.url}});
      return false;
    }
    return true;
  }

}
