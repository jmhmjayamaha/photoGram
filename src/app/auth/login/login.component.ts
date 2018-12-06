import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { NotificationService } from 'src/app/shared/notification.service';
import { DatabaseService } from 'src/app/shared/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _notifier :NotificationService, private _databaseService : DatabaseService ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().signInWithEmailAndPassword(email,password)
            .then( userData => {
              if(userData.emailVerified) {
                return this._databaseService.getUser(userData.uid); 
              }
              else {
                firebase.auth().signOut();
                const message = "The Email is not verified";
                this._notifier.display('error', message);
              }
            })
            .then(userDataFire => {
              if(userDataFire) {
                console.log(userDataFire);
              }
            }).catch(err => {
              this._notifier.display('error', err.message);
            })
  }
}
