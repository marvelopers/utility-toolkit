export enum LocalStorageKey {
  LoanInfo = 'loanInfo',
}

export class LocalStorage {
  static getValue(key: LocalStorageKey) {
    return localStorage.getItem(key);
  }

  static setValue(key: LocalStorageKey, value: string) {
    localStorage.setItem(key, value);
  }

  static removeItem(key: LocalStorageKey) {
    localStorage.removeItem(key);
  }
}
