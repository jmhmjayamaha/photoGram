import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import _ from 'lodash';

@Component({
  selector: 'app-favarites',
  templateUrl: './favarites.component.html',
  styleUrls: ['./favarites.component.css']
})
export class FavaritesComponent implements OnInit {

  favoriteList: any = [];
  
  constructor() { }

  ngOnInit() {
    const uid = firebase.auth().currentUser.uid;
    const favRef = firebase.database().ref('favorite').child(uid);

    favRef.once('value').then(snapshot => {
      const favoriteObj = snapshot.val();
      this.favoriteList = _.values(favoriteObj);
    });
  }

}
