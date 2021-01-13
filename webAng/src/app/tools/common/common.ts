
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
