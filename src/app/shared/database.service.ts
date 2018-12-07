import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { registerContentQuery } from "@angular/core/src/render3";

@Injectable()
export class DatabaseService {

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
}