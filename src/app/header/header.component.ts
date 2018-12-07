import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  name: string;
  email: string;
  uid: string;

  constructor(private _userService : UserService,
              private router: Router
    ) { }

  ngOnInit() {

    this._userService.statusChanged.subscribe(userData => {
      if(userData) {
        this.name = userData.fullname;
        this.email = userData.email;
        this.uid = userData.uid;
      } else {
        this.name = null;
        this.email = null;
        this.uid = null;
      }
    })

    firebase.auth().onAuthStateChanged(userData => {
      if(userData && userData.emailVerified) {
        this.isLoggedIn = true;
        const user = this._userService.getUser();

        this.name = user.fullname;
        this.email = user.email;
        this.uid = user.uid;

      }
      else {
        this.isLoggedIn = false;
      } 
    });
  }

  logout() {
    firebase.auth().signOut()
            .then(userData => {
              this._userService.destroy();
              this.isLoggedIn = false;
              this.router.navigate(['/login']);
            })
  }
}
