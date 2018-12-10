import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { registerContentQuery } from "@angular/core/src/render3";
import { UserService } from "./user.service";

@Injectable()
export class DatabaseService {

    constructor(private _userService: UserService) {

    }

    getUser(uid) {
        const ref = firebase.database().ref('users/' + uid);
        return ref.once('value')
                    .then(snapshot => {
                        return snapshot.val();
                    })
    }

    generateRandomName() {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    uploadFile(file) {
        const fileName = this.generateRandomName();
        const fileRef = firebase.storage().ref().child('images/' + fileName);
        const uploadTask = fileRef.put(file);

        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed', snapshot => {
            }, error => {
              reject(error);
            }, () => {
              const fileUrl =  uploadTask.snapshot.downloadURL;
              resolve({fileName, fileUrl});
            });
        });
    }

    handleImageUpload(data) {
        const user = this._userService.getUser();

        const newPersonalPostKey = firebase.database().ref().child('myPosts').push().key;
        const newpersonalDetails = {
            fileUrl: data.fileUrl,
            name: data.fileName,
            creationDate: new Date().toString()
        }

        const allPostKey = firebase.database().ref('allPosts').push().key;
        const allPostDetails = {
            fileUrl: data.fileUrl,
            name: data.fileName,
            creationDate: new Date().toString(),
            uploadedBy: user
        }

        const imageDetails = {
            fileUrl : data.fileUrl,
            name : data.fileName,
            creationDate: new Date().toString(),
            uploadedBy: user,
            favoriteCount: 0
        }
        const update = {};

        update['/myPosts/' + user.uid + "/" + newPersonalPostKey ] = newpersonalDetails;
        update['/allPosts/' + allPostKey] = allPostDetails;
        update['/images/' + data.fileName] = imageDetails;

        return firebase.database().ref().update(update);
    }
}