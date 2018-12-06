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

  constructor(private _userService : UserService,
              private router: Router
    ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(userData => {
      if(userData && userData.emailVerified) {
        this.isLoggedIn = true;
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
