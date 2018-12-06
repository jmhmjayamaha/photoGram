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
}