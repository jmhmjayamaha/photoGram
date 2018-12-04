import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form : NgForm ) {
    const fullname  = form.value.fullName;
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(userData => {
              userData.sendEmailVerification();

              return firebase.database().ref('users/' + userData.uid).set({
                email : email,
                uid: userData.uid,
                registrationDate: new Date().toString(),
                fullname: fullname
              })
            })
            .then(() => {
              // firebase.auth().signOut();
            })
            .catch(err => {
              console.log(err);
            })
  }
}
