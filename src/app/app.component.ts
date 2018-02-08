import { Component, OnInit, trigger } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  ngOnInit(): void {

    //google firebase SDK
    firebase.initializeApp({

      apiKey: "AIzaSyBdNvhG5MtHynE6uIUrS8sGHkjvguSZJGU",
      authDomain: "recipe-app-d34fb.firebaseapp.com"

    });
  }



}
