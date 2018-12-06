import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _notifier: NotificationService ) { }

  ngOnInit() {
  }

  onSubmit(form : NgForm ) {
    const fullname  = form.value.fullName;
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(userData => {
              userData.sendEmailVerification();

              const message = `A verification email has been sent to ${email}. kindly check your inbox and follow the steps
              in the verification email. Once verification is complete, please login to the application`;
              this._notifier.display('success', message);

              return firebase.database().ref('users/' + userData.uid).set({
                email : email,
                uid: userData.uid,
                registrationDate: new Date().toString(),
                fullname: fullname
              })
            })
            .then(() => {
              firebase.auth().signOut();
            })
            .catch(err => {
              this._notifier.display('error', err.message);
              console.log(err);
            })
  }
}
