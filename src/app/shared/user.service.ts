import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  statusChanged: any = new EventEmitter<any>();
  constructor() { }

  set(userFromDb) {
    localStorage.setItem('user', JSON.stringify(userFromDb));
    this.statusChanged.emit(userFromDb);
  }

  getUser() {
    const user =  localStorage.getItem('user');
    return JSON.parse(user);
  }
  destroy() {
    localStorage.removeItem('user');
    this.statusChanged.emit(null);
  }
}
