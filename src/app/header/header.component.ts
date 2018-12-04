import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor() { }

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

}
