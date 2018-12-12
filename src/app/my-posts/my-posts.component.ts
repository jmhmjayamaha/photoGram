import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../shared/database.service';
import { NotificationService } from '../shared/notification.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit, OnDestroy {

  personalPostRef: any;
  postLists: any = [];

  constructor(private _database : DatabaseService,
              private notifier : NotificationService) { }

  ngOnInit() {

    const uid = firebase.auth().currentUser.uid;
    this.personalPostRef = this._database.getUserPostsList(uid);
    this.personalPostRef.on("child_added" , data => {
      this.postLists.push({
        key: data.key,
        data: data.val()
      })
    });
  }

  onFileSelection(event) {
    const fileList:FileList = event.target.files;

    if(fileList.length > 0) {
      const file: File = fileList[0];
      this._database.uploadFile(file)
          .then( data => {
            this.notifier.display('success', 'Image uploaded successfully');
            this._database.handleImageUpload(data);
          }).catch(err => {
            this.notifier.display('error', err.message);
          })
    }
  }

  ngOnDestroy(){
    this.personalPostRef.off();
  }
}
