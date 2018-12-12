import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from "firebase";
import _ from "lodash";

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit, OnDestroy {

  allRef: any;
  all: any = [];

  constructor() { }

  ngOnInit() {
    this.allRef = firebase.database().ref("allPosts").limitToLast(3);
    this.allRef.on("child_added" , data => {
      this.all.push({
        key: data.key,
        data: data.val()
        
      })
    })
  }

  // onLoadMore(){
  //   if(this.all.length > 0) {
  //     const lastLoadedPost = _.last(this.all);

  //   }
  // }

  ngOnDestroy() {
    this.allRef.off();
  }

}
