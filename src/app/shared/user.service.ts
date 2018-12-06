import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  set(userFromDb) {
    localStorage.setItem('user', JSON.stringify(userFromDb));
  }

  destroy() {
    localStorage.removeItem('user');
  }
}
