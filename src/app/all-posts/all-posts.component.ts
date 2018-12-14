import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from "firebase";
import _ from 'lodash';
import { DatabaseService } from '../shared/database.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit, OnDestroy {

  loadMoreRef: any;
  allRef: any;
  all: any = [];

  constructor(private _database : DatabaseService, private _notifier: NotificationService) { }

  ngOnInit() {
    this.allRef = firebase.database().ref("allPosts").limitToFirst(3);
    this.allRef.on("child_added" , data => {
      this.all.push({
        key: data.key,
        data: data.val()
        
      })
    })
  }

  onLoadMore(){
    if (this.all.length > 0) {
      const lastLoadedPost = _.last(this.all);
      const lastLoadedPostKey = lastLoadedPost.key;

      this.loadMoreRef = firebase.database().ref('allPosts').startAt(null, lastLoadedPostKey).limitToFirst(3 + 1);

      this.loadMoreRef.on('child_added', data => {

        if (data.key === lastLoadedPostKey) {
          return;
        } else {
          this.all.push({
            key: data.key,
            data: data.val()
          });
        }

      });

    }
  }

  onFavoritesClicked(imageData) {
    this._database.handleFavoriteClicked(imageData)
        .then(data => {
          this._notifier.display('success', 'Image is added to favorite');
        }).catch(err => {
          this._notifier.display('error', err.message);
        })
  }

  onFollowClicked(imageData) {
    this._database.followUser(imageData.uploadedBy)
        .then(data => {
          this._notifier.display('success', 'You are following the user : ' + imageData.uploadedBy.fullname);
        }).catch(err => {
          this._notifier.display('error', err.message);
        })

  }

  ngOnDestroy() {
    this.allRef.off();
    if(this.loadMoreRef) {
      this.loadMoreRef.off();
    }
  }

}
