
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
