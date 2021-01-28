import {UserAddressComponent} from '../../components/user/user-address/user-address.component';
import {AuthGuard} from './auth.guard';

export function setLocalStorageItem(key: string,val: any): void{
  window.localStorage.setItem(key,val);
}

export function getLocalStorageItem(key: string): any{
  const ret = window.localStorage.getItem(key);
  return ret;
}

export function removeLocalStorageItem(key: string): void{
  window.localStorage.removeItem(key);
}

export const ROUTER_PATH_HOME = '';
export const ROUTER_PATH_DASHBOARD = 'dashboard';
export const ROUTER_PATH_SIGNUP = 'signup';
export const ROUTER_PATH_SIGNIN  = 'signin';
export const ROUTER_PATH_REGISTER = 'register';
export const ROUTER_PATH_USERSETTINGS = 'usersettings';

export const ROUTER_PATH_USERSETTINGS_USER = 'user';
export const ROUTER_PATH_USERSETTINGS_SEC = 'security';
export const ROUTER_PATH_USERSETTINGS_OTH = 'other';
export const ROUTER_PATH_USERSETTINGS_LOG = 'actlog';

export const ROUTER_URLPATH_USERSETTINGS_USER = 'usersettings/(navcontent:user)';
export const ROUTER_URLPATH_USERSETTINGS_SEC = 'usersettings/(navcontent:security)';
export const ROUTER_URLPATH_USERSETTINGS_OTH = 'usersettings/(navcontent:other)';
export const ROUTER_URLPATH_USERSETTINGS_LOG = 'usersettings/(navcontent:actlog)';
