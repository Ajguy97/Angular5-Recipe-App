import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import everything as firebase from firebase

@Injectable()
export class AuthService {

    constructor(
        private router: Router
    ) { }

    //set a token variable
    //we set this later
    private token = '';

    
    signUpUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
            (error) => console.log(error.message)
            )
    }


    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
            (response: Response) => {
                this.router.navigate([''])
                firebase.auth().currentUser.getToken()
                    .then(
                    (token: string) => this.token = token,
                )
            }
            )
            .catch(
            (error) => console.log(error)
            )
    }


    //function to get token from firebase to get access
    getToken() {
        //method returns a promise -> async method to get the token
        firebase.auth().currentUser.getToken().then(
            (token: string) =>
                this.token = token
        )
        return this.token;
    }

    //method used by auth service to find out of user is authenticated
    //returns true if token token is not null -> there is a token
    isAuthenticated() {
        return this.token != null;
    }

    //use firebase signout method
    //set token to null -> no more access
    logoutUser() {
        firebase.auth().signOut();
        this.token = null;
    }

}