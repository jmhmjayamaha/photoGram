import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../shared/database.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  constructor(private _database : DatabaseService,
              private notifier : NotificationService) { }

  ngOnInit() {
  }

  onFileSelection(event) {
    const fileList:FileList = event.target.files;

    if(fileList.length > 0) {
      const file: File = fileList[0];
      this._database.uploadFile(file)
          .then( data => {
            this.notifier.display('success', 'Image uploaded successfully');
            console.log(data['fileUrl']);
          }).catch(err => {
            this.notifier.display('error', err.message);
          })
    }
  }
}
